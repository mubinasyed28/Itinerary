// Sample data for demonstration (simulating backend responses)
const sampleItinerary = {
  "success": true,
  "data": {
    "destination": "Jaipur, India",
    "days": 3,
    "profile": {
      "travelers": "Couple",
      "budget": "₹30,000",
      "interests": ["Food", "Shopping"],
      "avoid": ["Hiking"]
    },
    "itinerary": [
      {
        "Day": 1,
        "Plan": [
          {
            "Time": "09:00",
            "Activity": "Breakfast at Tapri Central",
            "Description": "Start your day with a hearty breakfast at Tapri Central, known for its cozy ambiance and delicious Indian and Continental dishes.",
            "Details": {
              "Cost": "₹600 for two",
              "Cuisine": "Indian and Continental",
              "Location": "Tapri Central, C-Scheme"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "10:30",
            "Activity": "Visit Hawa Mahal",
            "Description": "Explore the iconic Hawa Mahal, a stunning palace with intricate latticework, and learn about its historical significance.",
            "Details": {
              "Entry Fee": "₹50 per person (Indians), ₹200 per person (Foreigners)",
              "Location": "Hawa Mahal, Badi Choupad",
              "Timings": "09:00 AM - 04:30 PM"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "12:30",
            "Activity": "Lunch at Laxmi Misthan Bhandar (LMB)",
            "Description": "Enjoy a traditional Rajasthani thali at LMB, a legendary restaurant in Jaipur known for its authentic flavors.",
            "Details": {
              "Cost": "₹800 for two",
              "Cuisine": "Rajasthani Thali",
              "Location": "LMB, Johari Bazaar"
            },
            "Mode of Transport": "Walk"
          },
          {
            "Time": "14:00",
            "Activity": "Shopping at Johari Bazaar",
            "Description": "Shop for traditional jewelry, textiles, and handicrafts at Johari Bazaar, one of Jaipur's most famous markets.",
            "Details": {
              "Budget": "₹5,000",
              "Items": "Jewelry, Textiles, Handicrafts",
              "Location": "Johari Bazaar"
            },
            "Mode of Transport": "Walk"
          },
          {
            "Time": "17:00",
            "Activity": "Visit City Palace",
            "Description": "Explore the grandeur of the City Palace, a blend of Rajasthani and Mughal architecture, and visit its museums and courtyards.",
            "Details": {
              "Entry Fee": "₹200 per person (Indians), ₹700 per person (Foreigners)",
              "Location": "City Palace, Jaleb Chowk",
              "Timings": "09:30 AM - 05:00 PM"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "19:30",
            "Activity": "Dinner at Suvarna Mahal, Rambagh Palace",
            "Description": "End your day with a royal dining experience at Suvarna Mahal, located in the luxurious Rambagh Palace.",
            "Details": {
              "Cost": "₹2,500 for two",
              "Cuisine": "Fine Dining (Rajasthani and Continental)",
              "Location": "Suvarna Mahal, Rambagh Palace"
            },
            "Mode of Transport": "Taxi"
          }
        ]
      },
      {
        "Day": 2,
        "Plan": [
          {
            "Time": "09:00",
            "Activity": "Breakfast at Sanjay's Omelette",
            "Description": "Start your day with a delicious and affordable breakfast at Sanjay's Omelette, a local favorite.",
            "Details": {
              "Cost": "₹300 for two",
              "Cuisine": "Street Food (Omelettes and Parathas)",
              "Location": "Sanjay's Omelette, MI Road"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "10:30",
            "Activity": "Visit Amber Fort",
            "Description": "Explore the majestic Amber Fort, known for its artistic style and stunning views of the surrounding hills.",
            "Details": {
              "Entry Fee": "₹100 per person (Indians), ₹500 per person (Foreigners)",
              "Location": "Amber Fort, Amer",
              "Timings": "08:00 AM - 05:30 PM"
            },
            "Mode of Transport": "Taxi"
          },
          {
            "Time": "13:00",
            "Activity": "Lunch at 1135 AD, Amber Fort",
            "Description": "Enjoy a royal lunch at 1135 AD, a restaurant inside Amber Fort that offers a regal dining experience.",
            "Details": {
              "Cost": "₹1,500 for two",
              "Cuisine": "Rajasthani and North Indian",
              "Location": "1135 AD, Amber Fort"
            },
            "Mode of Transport": "Walk"
          },
          {
            "Time": "15:00",
            "Activity": "Shopping at Bapu Bazaar",
            "Description": "Shop for leather goods, textiles, and souvenirs at Bapu Bazaar, a bustling market in Jaipur.",
            "Details": {
              "Budget": "₹5,000",
              "Items": "Leather Goods, Textiles, Souvenirs",
              "Location": "Bapu Bazaar"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "18:00",
            "Activity": "Visit Jantar Mantar",
            "Description": "Explore the astronomical observatory Jantar Mantar, a UNESCO World Heritage Site, and learn about its historical significance.",
            "Details": {
              "Entry Fee": "₹50 per person (Indians), ₹200 per person (Foreigners)",
              "Location": "Jantar Mantar, Gangori Bazaar",
              "Timings": "09:00 AM - 04:30 PM"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "20:00",
            "Activity": "Dinner at The Forrester, Narain Niwas Palace",
            "Description": "Enjoy a romantic dinner at The Forrester, a fine-dining restaurant located in the beautiful Narain Niwas Palace.",
            "Details": {
              "Cost": "₹2,000 for two",
              "Cuisine": "Multi-cuisine (Indian, Continental, Chinese)",
              "Location": "The Forrester, Narain Niwas Palace"
            },
            "Mode of Transport": "Taxi"
          }
        ]
      },
      {
        "Day": 3,
        "Plan": [
          {
            "Time": "09:00",
            "Activity": "Breakfast at Samode Haveli",
            "Description": "Start your day with a luxurious breakfast at Samode Haveli, a heritage hotel known for its elegant ambiance.",
            "Details": {
              "Cost": "₹1,000 for two",
              "Cuisine": "Continental and Indian",
              "Location": "Samode Haveli, Gangapole"
            },
            "Mode of Transport": "Taxi"
          },
          {
            "Time": "10:30",
            "Activity": "Visit Nahargarh Fort",
            "Description": "Explore Nahargarh Fort, known for its panoramic views of Jaipur and its rich history.",
            "Details": {
              "Entry Fee": "₹50 per person (Indians), ₹200 per person (Foreigners)",
              "Location": "Nahargarh Fort, Krishna Nagar",
              "Timings": "10:00 AM - 05:30 PM"
            },
            "Mode of Transport": "Taxi"
          },
          {
            "Time": "12:30",
            "Activity": "Lunch at The Stag, Hotel Clarks Amer",
            "Description": "Enjoy a sumptuous lunch at The Stag, a popular restaurant in Hotel Clarks Amer.",
            "Details": {
              "Cost": "₹1,500 for two",
              "Cuisine": "North Indian and Continental",
              "Location": "The Stag, Hotel Clarks Amer"
            },
            "Mode of Transport": "Taxi"
          },
          {
            "Time": "14:00",
            "Activity": "Shopping at MI Road",
            "Description": "Shop for clothing, accessories, and books at MI Road, a popular shopping destination in Jaipur.",
            "Details": {
              "Budget": "₹5,000",
              "Items": "Clothing, Accessories, Books",
              "Location": "MI Road"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "16:30",
            "Activity": "Visit Albert Hall Museum",
            "Description": "Explore the Albert Hall Museum, the oldest museum in Rajasthan, known for its rich collection of artifacts.",
            "Details": {
              "Entry Fee": "₹40 per person (Indians), ₹300 per person (Foreigners)",
              "Location": "Albert Hall Museum, Ram Niwas Garden",
              "Timings": "09:00 AM - 05:00 PM, 07:00 PM - 10:00 PM"
            },
            "Mode of Transport": "Auto-rickshaw"
          },
          {
            "Time": "19:30",
            "Activity": "Dinner at Peacock Rooftop Restaurant",
            "Description": "End your trip with a delightful dinner at Peacock Rooftop Restaurant, offering a stunning view of the city.",
            "Details": {
              "Cost": "₹1,500 for two",
              "Cuisine": "Rajasthani and North Indian",
              "Location": "Peacock Rooftop Restaurant, Hotel Pearl Palace"
            },
            "Mode of Transport": "Taxi"
          }
        ]
      }
    ]
  }
};

// App state - Enhanced form data
let currentFormData = {
  destination: '',
  days: '',
  numberOfPeople: '',
  travelers: '',
  ageRange: '',
  budget: '',
  travelStyle: '',
  accommodation: '',
  transportation: '',
  interests: [],
  avoid: ''
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing Nexora Travel App');
  
  // Initialize the application
  initializeApp();
});

function initializeApp() {
  console.log('Initializing Nexora Travel App');
  
  // Get DOM Elements
  const planTripBtn = document.getElementById('planTripBtn');
  const planningSection = document.getElementById('planningSection');
  const loadingSection = document.getElementById('loadingSection');
  const resultsSection = document.getElementById('resultsSection');
  const backToHeroBtn = document.getElementById('backToHero');
  const planningForm = document.getElementById('planningForm');
  const printItineraryBtn = document.getElementById('printItinerary');
  const shareItineraryBtn = document.getElementById('shareItinerary');
  const planAnotherTripBtn = document.getElementById('planAnotherTrip');

  console.log('Elements found:', {
    planTripBtn: !!planTripBtn,
    planningSection: !!planningSection,
    loadingSection: !!loadingSection,
    resultsSection: !!resultsSection
  });

  // Navigation functions
  function showSection(sectionToShow) {
    console.log('Showing section:', sectionToShow ? sectionToShow.id : 'null');
    
    const sections = [planningSection, loadingSection, resultsSection];
    sections.forEach(section => {
      if (section) {
        section.classList.add('hidden');
      }
    });
    
    if (sectionToShow) {
      sectionToShow.classList.remove('hidden');
      sectionToShow.classList.add('fade-in');
      
      // Scroll to section
      setTimeout(() => {
        sectionToShow.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  function showHero() {
    console.log('Showing hero section');
    
    const sections = [planningSection, loadingSection, resultsSection];
    sections.forEach(section => {
      if (section) {
        section.classList.add('hidden');
      }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Collect form data directly from form elements
  function collectFormData() {
    if (!planningForm) {
      console.error('Planning form not found');
      return {};
    }

    const formData = new FormData(planningForm);
    const data = {};
    
    // Collect regular form fields
    for (let [key, value] of formData.entries()) {
      if (key === 'interests') {
        // Handle multiple interests checkboxes
        if (!data.interests) {
          data.interests = [];
        }
        data.interests.push(value);
      } else {
        data[key] = value;
      }
    }
    
    // Ensure interests array exists
    if (!data.interests) {
      data.interests = [];
    }

    console.log('Collected form data:', data);
    return data;
  }

  // Enhanced form handling functions
  function setupFormInteractions() {
    console.log('Setting up enhanced form interactions');
    
    if (!planningForm) {
      console.error('Planning form not found');
      return;
    }
    
    // Handle all form inputs for real-time updates
    const formInputs = planningForm.querySelectorAll('input, textarea, select');
    console.log('Found form inputs:', formInputs.length);
    
    formInputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.addEventListener('change', function(e) {
          // Update currentFormData for real-time tracking
          if (!currentFormData.interests) {
            currentFormData.interests = [];
          }
          
          if (e.target.checked) {
            if (!currentFormData.interests.includes(e.target.value)) {
              currentFormData.interests.push(e.target.value);
            }
          } else {
            currentFormData.interests = currentFormData.interests.filter(
              interest => interest !== e.target.value
            );
          }
          console.log('Interests updated:', currentFormData.interests);
        });
      } else {
        input.addEventListener('input', function(e) {
          currentFormData[e.target.name] = e.target.value;
          console.log(`${e.target.name} updated:`, e.target.value);
        });
      }
    });
  }

  // Enhanced profile construction
  function constructProfileString(formData) {
    const profileParts = [];
    
    // Basic info
    if (formData.travelers) {
      profileParts.push(`Travel type: ${formData.travelers}`);
    }
    
    if (formData.numberOfPeople) {
      profileParts.push(`${formData.numberOfPeople} people`);
    }
    
    if (formData.ageRange) {
      profileParts.push(`Age range: ${formData.ageRange}`);
    }
    
    if (formData.budget) {
      profileParts.push(`Budget: ${formData.budget}`);
    }
    
    // Travel preferences
    if (formData.travelStyle) {
      profileParts.push(`Travel style: ${formData.travelStyle}`);
    }
    
    if (formData.accommodation) {
      profileParts.push(`Accommodation: ${formData.accommodation}`);
    }
    
    if (formData.transportation) {
      profileParts.push(`Transportation: ${formData.transportation}`);
    }
    
    // Interests
    if (formData.interests && formData.interests.length > 0) {
      profileParts.push(`Interests: ${formData.interests.join(', ')}`);
    }
    
    // Things to avoid
    if (formData.avoid && formData.avoid.trim()) {
      profileParts.push(`Avoid: ${formData.avoid.trim()}`);
    }
    
    return profileParts.join('. ');
  }

  // Simulated API call with enhanced data
  async function generateItinerary(formData) {
    console.log('Generating itinerary for:', formData);
    
    // Construct comprehensive profile
    const profileString = constructProfileString(formData);
    console.log('Constructed profile:', profileString);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate loading steps
    await simulateLoadingSteps();
    
    // Return sample data with enhanced profile
    const customizedData = {
      ...sampleItinerary,
      data: {
        ...sampleItinerary.data,
        destination: formData.destination || sampleItinerary.data.destination,
        days: parseInt(formData.days) || sampleItinerary.data.days,
        profile: parseEnhancedProfile(formData)
      }
    };
    
    console.log('Generated itinerary:', customizedData);
    return customizedData;
  }

  function parseEnhancedProfile(formData) {
    const profile = {
      travelers: formData.travelers || "Not specified",
      budget: formData.budget || "Not specified",
      interests: formData.interests && formData.interests.length > 0 
        ? formData.interests 
        : ["Not specified"],
      avoid: formData.avoid || "None specified",
      travelStyle: formData.travelStyle || "Not specified",
      accommodation: formData.accommodation || "Not specified",
      transportation: formData.transportation || "Not specified",
      numberOfPeople: formData.numberOfPeople || "Not specified",
      ageRange: formData.ageRange || "Not specified"
    };
    
    return profile;
  }

  async function simulateLoadingSteps() {
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    // Step 2
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (step2) {
      step2.classList.add('loading-step--active');
      const step2Icon = step2.querySelector('.step-icon');
      if (step2Icon) step2Icon.textContent = '✓';
    }
    
    // Step 3
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (step3) {
      step3.classList.add('loading-step--active');
      const step3Icon = step3.querySelector('.step-icon');
      if (step3Icon) step3Icon.textContent = '✓';
    }
  }

  // Enhanced results rendering
  function renderResults(data) {
    console.log('Rendering results:', data);
    
    // Update header information
    const resultDestination = document.getElementById('resultDestination');
    const resultDays = document.getElementById('resultDays');
    
    if (resultDestination) resultDestination.textContent = data.destination;
    if (resultDays) resultDays.textContent = `${data.days} Days`;
    
    // Update enhanced profile summary
    const profileElements = {
      profileTravelers: data.profile.travelers,
      profileBudget: data.profile.budget,
      profileInterests: Array.isArray(data.profile.interests) 
        ? data.profile.interests.join(', ') 
        : data.profile.interests,
      profileAvoid: data.profile.avoid
    };
    
    Object.entries(profileElements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
    
    // Render itinerary
    const container = document.getElementById('itineraryContainer');
    if (container) {
      container.innerHTML = '';
      
      data.itinerary.forEach(day => {
        const dayCard = createDayCard(day);
        container.appendChild(dayCard);
      });
    }
  }

  function createDayCard(dayData) {
    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';
    
    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.innerHTML = `<h4 class="day-title">Day ${dayData.Day}</h4>`;
    
    const dayActivities = document.createElement('div');
    dayActivities.className = 'day-activities';
    
    dayData.Plan.forEach(activity => {
      const activityItem = createActivityItem(activity);
      dayActivities.appendChild(activityItem);
    });
    
    dayCard.appendChild(dayHeader);
    dayCard.appendChild(dayActivities);
    
    return dayCard;
  }

  function createActivityItem(activity) {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    const timeElement = document.createElement('div');
    timeElement.className = 'activity-time';
    timeElement.textContent = activity.Time;
    
    const contentElement = document.createElement('div');
    contentElement.className = 'activity-content';
    
    const nameElement = document.createElement('div');
    nameElement.className = 'activity-name';
    nameElement.textContent = activity.Activity;
    
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'activity-description';
    descriptionElement.textContent = activity.Description;
    
    const detailsElement = createDetailsElement(activity.Details);
    
    const transportElement = document.createElement('div');
    transportElement.className = 'activity-transport';
    transportElement.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L6 2L10 6L6 10L2 6Z" fill="currentColor"/>
      </svg>
      ${activity['Mode of Transport']}
    `;
    
    contentElement.appendChild(nameElement);
    contentElement.appendChild(descriptionElement);
    contentElement.appendChild(detailsElement);
    contentElement.appendChild(transportElement);
    
    activityItem.appendChild(timeElement);
    activityItem.appendChild(contentElement);
    
    return activityItem;
  }

  function createDetailsElement(details) {
    const detailsElement = document.createElement('div');
    detailsElement.className = 'activity-details';
    
    Object.entries(details).forEach(([key, value]) => {
      const detailItem = document.createElement('div');
      detailItem.className = 'detail-item';
      
      let displayValue = value;
      if (Array.isArray(value)) {
        displayValue = value.join(', ');
      }
      
      detailItem.innerHTML = `
        <span class="detail-label">${key}:</span>
        <span class="detail-value">${displayValue}</span>
      `;
      
      detailsElement.appendChild(detailItem);
    });
    
    return detailsElement;
  }

  // Action functions
  function printItinerary() {
    console.log('Printing itinerary');
    window.print();
  }

  function shareItinerary() {
    console.log('Sharing itinerary');
    
    const destination = document.getElementById('resultDestination')?.textContent || 'Unknown Destination';
    const days = document.getElementById('resultDays')?.textContent || '0 Days';
    
    const shareText = `Check out my ${days} itinerary for ${destination} created with Nexora - Smart Travel Planner!`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Travel Itinerary',
        text: shareText,
        url: shareUrl,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        // Show feedback
        const btn = shareItineraryBtn;
        if (btn) {
          const originalText = btn.innerHTML;
          btn.innerHTML = '✓ Copied!';
          btn.style.background = 'var(--color-success)';
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
          }, 2000);
        }
      }).catch(err => {
        console.log('Error copying to clipboard:', err);
        alert('Share link: ' + shareUrl);
      });
    }
  }

  function resetForm() {
    if (planningForm) {
      planningForm.reset();
    }
    
    // Reset form data
    currentFormData = {
      destination: '',
      days: '',
      numberOfPeople: '',
      travelers: '',
      ageRange: '',
      budget: '',
      travelStyle: '',
      accommodation: '',
      transportation: '',
      interests: [],
      avoid: ''
    };
    
    // Reset loading steps
    const steps = document.querySelectorAll('.loading-step');
    steps.forEach((step, index) => {
      if (index === 0) {
        step.classList.add('loading-step--active');
        const stepIcon = step.querySelector('.step-icon');
        if (stepIcon) stepIcon.textContent = '✓';
      } else {
        step.classList.remove('loading-step--active');
        const stepIcon = step.querySelector('.step-icon');
        if (stepIcon) stepIcon.textContent = '⏳';
      }
    });
  }

  // Enhanced form validation using collected form data
  function validateFormData(formData) {
    const requiredFields = ['destination', 'days', 'numberOfPeople', 'travelers', 'ageRange', 'budget'];
    const missingFields = [];
    
    requiredFields.forEach(fieldName => {
      const fieldValue = formData[fieldName];
      if (!fieldValue || fieldValue.toString().trim() === '') {
        missingFields.push(fieldName);
      }
    });
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Validate days range
    const days = parseInt(formData.days);
    if (isNaN(days) || days < 1 || days > 30) {
      alert('Number of days must be between 1 and 30');
      return false;
    }
    
    // Validate number of people range
    const people = parseInt(formData.numberOfPeople);
    if (isNaN(people) || people < 1 || people > 50) {
      alert('Number of people must be between 1 and 50');
      return false;
    }
    
    return true;
  }

  // Setup event listeners
  function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // Plan Trip button
    if (planTripBtn) {
      planTripBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Plan Trip button clicked');
        if (planningSection) {
          showSection(planningSection);
        } else {
          console.error('Planning section not found');
        }
      });
      console.log('Plan Trip button listener added');
    } else {
      console.error('Plan Trip button not found');
    }
    
    // Back to Hero button
    if (backToHeroBtn) {
      backToHeroBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Back to Hero button clicked');
        showHero();
      });
    }
    
    // Plan Another Trip button
    if (planAnotherTripBtn) {
      planAnotherTripBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Plan Another Trip button clicked');
        resetForm();
        if (planningSection) {
          showSection(planningSection);
        }
      });
    }
    
    // Enhanced form submission
    if (planningForm) {
      planningForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Collect current form data
        const formData = collectFormData();
        console.log('Collected form data for validation:', formData);
        
        // Validate form using collected data
        if (!validateFormData(formData)) {
          return;
        }
        
        // Show loading
        if (loadingSection) {
          showSection(loadingSection);
        }
        
        try {
          // Generate itinerary
          const result = await generateItinerary(formData);
          
          if (result.success) {
            renderResults(result.data);
            if (resultsSection) {
              showSection(resultsSection);
            }
          } else {
            throw new Error('Failed to generate itinerary');
          }
        } catch (error) {
          console.error('Error generating itinerary:', error);
          alert('Sorry, there was an error generating your itinerary. Please try again.');
          if (planningSection) {
            showSection(planningSection);
          }
        }
      });
    }
    
    // Action buttons
    if (printItineraryBtn) {
      printItineraryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        printItinerary();
      });
    }
    
    if (shareItineraryBtn) {
      shareItineraryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        shareItinerary();
      });
    }
  }

  // Setup enhanced form interactions
  setupFormInteractions();
  
  // Setup all event listeners
  setupEventListeners();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  console.log('Nexora Travel App initialized successfully');
}

// Add CSS animations for enhanced loading
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { opacity: 0.6; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.05); }
  }
  
  .loading-globe svg {
    animation: pulse 2s ease-in-out infinite alternate;
  }
`;
document.head.appendChild(style);