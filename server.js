import express from 'express';
import cors from 'cors';
import axios from 'axios';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || 'http://localhost:3000';

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Apply rate limiting to all requests
app.use('/api/', limiter);

// More strict rate limiting for itinerary generation
const itineraryLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 itinerary generations per 5 minutes
  message: {
    success: false,
    error: 'Too many itinerary requests. Please wait 5 minutes before trying again.'
  }
});

// Logging
app.use(morgan('combined'));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://www.yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from React build (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    service: 'Nexora Node.js Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Python server health check
app.get('/api/python-health', async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_SERVER_URL}/health`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    res.json({
      success: true,
      pythonServer: response.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Python server health check failed:', error.message);
    res.status(503).json({
      success: false,
      error: 'Python server is not available',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Input validation middleware
const validateItineraryRequest = (req, res, next) => {
  const { destination, days, profile } = req.body;
  
  // Check required fields
  if (!destination || !days || !profile) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      required: ['destination', 'days', 'profile'],
      received: {
        destination: !!destination,
        days: !!days,
        profile: !!profile
      }
    });
  }
  
  // Validate destination
  if (typeof destination !== 'string' || destination.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Destination must be a string with at least 2 characters'
    });
  }
  
  // Validate days
  const daysNum = parseInt(days);
  if (isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
    return res.status(400).json({
      success: false,
      error: 'Days must be a number between 1 and 30'
    });
  }
  
  // Validate profile
  if (typeof profile !== 'string' || profile.trim().length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Profile must be a string with at least 10 characters describing your travel preferences'
    });
  }
  
  // Sanitize inputs
  req.body.destination = destination.trim();
  req.body.days = daysNum;
  req.body.profile = profile.trim();
  
  next();
};

// Main itinerary generation endpoint - bridges to Python server
app.post('/api/generate-itinerary', itineraryLimiter, validateItineraryRequest, async (req, res) => {
  const { destination, days, profile } = req.body;
  
  console.log(`🚀 Generating itinerary: ${destination}, ${days} days`);
  console.log(`📝 Profile: ${profile.substring(0, 100)}...`);
  
  try {
    // Forward request to Python Flask server
    const response = await axios.post(`${PYTHON_SERVER_URL}/generate`, {
      destination,
      days,
      profile
    }, {
      timeout: 120000, // 2 minutes timeout for AI generation
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Nexora-NodeJS-Bridge/1.0'
      }
    });
    
    // Log successful generation
    console.log(`✅ Itinerary generated successfully for ${destination}`);
    
    // Add metadata to response
    const enhancedResponse = {
      ...response.data,
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: response.headers['x-processing-time'] || 'unknown',
        version: '1.0.0'
      }
    };
    
    res.json(enhancedResponse);
    
  } catch (error) {
    console.error(`❌ Error generating itinerary for ${destination}:`, error.message);
    
    // Handle different types of errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: 'AI service is temporarily unavailable. Please try again in a few minutes.',
        code: 'SERVICE_UNAVAILABLE'
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({
        success: false,
        error: 'Request timeout. The AI is taking longer than expected. Please try again.',
        code: 'TIMEOUT'
      });
    }
    
    if (error.response) {
      // Forward Python server error
      return res.status(error.response.status).json({
        success: false,
        error: error.response.data?.error || 'AI generation failed',
        code: 'PYTHON_SERVER_ERROR',
        details: error.response.data
      });
    }
    
    // Generic error
    res.status(500).json({
      success: false,
      error: 'Internal server error occurred while generating itinerary',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get popular destinations (mock data for now)
app.get('/api/destinations/popular', (req, res) => {
  const popularDestinations = [
    {
      id: 1,
      name: 'Jaipur, India',
      country: 'India',
      type: 'Cultural Heritage',
      averageDays: 3,
      popularWith: ['couples', 'families', 'culture enthusiasts'],
      budgetRange: '₹15,000 - ₹50,000',
      bestTime: 'October to March',
      highlights: ['Hawa Mahal', 'City Palace', 'Amber Fort']
    },
    {
      id: 2,
      name: 'Goa, India',
      country: 'India',
      type: 'Beach Paradise',
      averageDays: 4,
      popularWith: ['couples', 'party groups', 'beach lovers'],
      budgetRange: '₹20,000 - ₹60,000',
      bestTime: 'November to February',
      highlights: ['Beaches', 'Water Sports', 'Nightlife']
    },
    {
      id: 3,
      name: 'Kerala, India',
      country: 'India',
      type: 'Nature & Backwaters',
      averageDays: 5,
      popularWith: ['couples', 'nature lovers', 'families'],
      budgetRange: '₹25,000 - ₹70,000',
      bestTime: 'September to March',
      highlights: ['Backwaters', 'Hill Stations', 'Ayurveda']
    },
    {
      id: 4,
      name: 'Dubai, UAE',
      country: 'UAE',
      type: 'Luxury & Shopping',
      averageDays: 4,
      popularWith: ['luxury travelers', 'shoppers', 'families'],
      budgetRange: '₹60,000 - ₹150,000',
      bestTime: 'November to March',
      highlights: ['Burj Khalifa', 'Shopping Malls', 'Desert Safari']
    },
    {
      id: 5,
      name: 'Bangkok, Thailand',
      country: 'Thailand',
      type: 'Urban Adventure',
      averageDays: 3,
      popularWith: ['backpackers', 'food lovers', 'culture seekers'],
      budgetRange: '₹30,000 - ₹80,000',
      bestTime: 'November to February',
      highlights: ['Street Food', 'Temples', 'Markets']
    },
    {
      id: 6,
      name: 'Paris, France',
      country: 'France',
      type: 'Romantic City',
      averageDays: 4,
      popularWith: ['couples', 'art lovers', 'luxury travelers'],
      budgetRange: '₹80,000 - ₹200,000',
      bestTime: 'April to June, September to October',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Champs-Élysées']
    }
  ];
  
  res.json({
    success: true,
    destinations: popularDestinations,
    total: popularDestinations.length
  });
});

// Get travel tips for a destination
app.get('/api/destinations/:destination/tips', async (req, res) => {
  const { destination } = req.params;
  
  try {
    // This could be enhanced to call the Python server's Tavily search
    const mockTips = [
      {
        category: 'Budget',
        tip: 'Book accommodations in advance for better deals',
        priority: 'high'
      },
      {
        category: 'Transport',
        tip: 'Local transport apps can save time and money',
        priority: 'medium'
      },
      {
        category: 'Culture',
        tip: 'Learn basic local phrases for better interactions',
        priority: 'medium'
      },
      {
        category: 'Safety',
        tip: 'Keep copies of important documents',
        priority: 'high'
      }
    ];
    
    res.json({
      success: true,
      destination: destination,
      tips: mockTips,
      generated_at: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch travel tips'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Serve React app for production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nexora Node.js backend server running on port ${PORT}`);
  console.log(`🔗 Python server URL: ${PYTHON_SERVER_URL}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🛡️  CORS enabled for development origins`);
  console.log(`⚡ Rate limiting: 100 requests per 15 minutes, 5 itinerary generations per 5 minutes`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT. Graceful shutdown...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM. Graceful shutdown...');
  process.exit(0);
});

export default app;