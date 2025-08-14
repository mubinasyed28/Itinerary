#!/bin/bash

# Nexora Travel Planner - Startup Script
echo "🌟 Welcome to Nexora Travel Planner Setup!"
echo "========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed  
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to start development environment
start_dev() {
    echo "🚀 Starting Nexora in development mode..."
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        echo "⚠️  .env file not found. Creating from template..."
        cat > .env << EOF
# Node.js Backend Configuration
NODE_ENV=development
PORT=5000

# Python Flask Server Configuration  
PYTHON_SERVER_URL=http://localhost:3000

# API Keys (Please update with your actual keys)
TAVILY_API_KEY=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
MISTRAL_API_KEY=f1bIWdWMfTBJHbLFhsC3KQk2JX5Z1tjl

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000
EOF
        echo "✅ .env file created. Please update it with your API keys!"
        echo "   You can get Tavily API key from: https://tavily.com"
        echo "   You can get Mistral API key from: https://mistral.ai"
        read -p "Press Enter when you've updated your API keys..."
    fi
    
    # Build and start services
    echo "🔨 Building and starting services..."
    docker-compose up --build
}

# Function to start production environment
start_prod() {
    echo "🚀 Starting Nexora in production mode..."
    export NODE_ENV=production
    docker-compose --profile production up --build -d
    
    echo "✅ Production services started!"
    echo "   Frontend will be available at: http://localhost"
    echo "   Backend API: http://localhost:5000"
    echo "   Python AI Server: http://localhost:3000"
}

# Function to stop all services
stop_services() {
    echo "🛑 Stopping all Nexora services..."
    docker-compose down
    echo "✅ All services stopped!"
}

# Function to view logs
view_logs() {
    echo "📊 Viewing service logs..."
    echo "Available services: python-server, backend-server, nginx, redis, mongodb"
    read -p "Enter service name (or 'all' for all services): " service
    
    if [ "$service" = "all" ]; then
        docker-compose logs -f
    else
        docker-compose logs -f $service
    fi
}

# Function to run health checks
health_check() {
    echo "🏥 Running health checks..."
    
    echo "Checking Python Flask server..."
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Python server is healthy"
    else
        echo "❌ Python server is not responding"
    fi
    
    echo "Checking Node.js backend..."
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        echo "✅ Node.js backend is healthy"
    else
        echo "❌ Node.js backend is not responding"
    fi
}

# Function to clean up Docker resources
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo "✅ Cleanup complete!"
}

# Function to show usage
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev         Start development environment"
    echo "  prod        Start production environment"
    echo "  stop        Stop all services"
    echo "  logs        View service logs"
    echo "  health      Run health checks"
    echo "  cleanup     Clean up Docker resources"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev      # Start development environment"
    echo "  $0 prod     # Start production environment"
    echo "  $0 logs     # View logs for all services"
}

# Parse command line arguments
case "${1:-dev}" in
    "dev")
        start_dev
        ;;
    "prod") 
        start_prod
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        view_logs
        ;;
    "health")
        health_check
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        show_help
        exit 1
        ;;
esac