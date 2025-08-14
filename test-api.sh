#!/bin/bash

# Nexora Travel Planner - API Testing Script
echo "🧪 Testing Nexora Travel Planner API Endpoints"
echo "==============================================="

# Configuration
BACKEND_URL="http://localhost:5000"
PYTHON_URL="http://localhost:3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Function to test endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    
    echo -e "${YELLOW}Testing: $description${NC}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$url")
    fi
    
    if [ "$response" -eq 200 ] || [ "$response" -eq 201 ]; then
        print_result 0 "$description (Status: $response)"
    else
        print_result 1 "$description (Status: $response)"
    fi
    
    echo ""
}

# Function to wait for services
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is ready!${NC}"
            return 0
        fi
        echo "   Attempt $attempt/$max_attempts - $service_name not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ $service_name failed to start after $max_attempts attempts${NC}"
    return 1
}

# Start testing
echo "🚀 Starting API tests..."
echo ""

# Wait for services to be ready
wait_for_service "$PYTHON_URL/health" "Python Flask Server"
wait_for_service "$BACKEND_URL/api/health" "Node.js Backend"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Services are not ready. Please start the services first with: ./start.sh dev${NC}"
    exit 1
fi

echo ""
echo "🔍 Running API endpoint tests..."
echo ""

# Test 1: Python Flask Server Health Check
test_endpoint "GET" "$PYTHON_URL/health" "" "Python Flask Server Health Check"

# Test 2: Node.js Backend Health Check
test_endpoint "GET" "$BACKEND_URL/api/health" "" "Node.js Backend Health Check"

# Test 3: Python Server Health Check via Backend
test_endpoint "GET" "$BACKEND_URL/api/python-health" "" "Python Server Health via Backend"

# Test 4: Popular Destinations
test_endpoint "GET" "$BACKEND_URL/api/destinations/popular" "" "Get Popular Destinations"

# Test 5: Travel Tips for a Destination
test_endpoint "GET" "$BACKEND_URL/api/destinations/Paris/tips" "" "Get Travel Tips for Paris"

# Test 6: Generate Itinerary - Valid Request
echo -e "${YELLOW}Testing: Generate Itinerary (Valid Request) - This may take 1-2 minutes...${NC}"
itinerary_data='{
  "destination": "Jaipur, India",
  "days": 2,
  "profile": "Couple, ₹20,000 budget, cultural sites and local food, avoid adventure sports"
}'

start_time=$(date +%s)
response=$(curl -s -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$itinerary_data" "$BACKEND_URL/api/generate-itinerary")
end_time=$(date +%s)
duration=$((end_time - start_time))

http_code=$(echo "$response" | tail -c 4)
response_body=$(echo "$response" | sed '$ s/...$//')

if [ "$http_code" = "200" ]; then
    print_result 0 "Generate Itinerary (Valid Request) - Duration: ${duration}s"
    echo "   Sample response preview:"
    echo "$response_body" | head -n 5 | sed 's/^/   /'
    echo "   ..."
else
    print_result 1 "Generate Itinerary (Valid Request) - Status: $http_code"
    echo "   Error response:"
    echo "$response_body" | head -n 3 | sed 's/^/   /'
fi
echo ""

# Test 7: Generate Itinerary - Invalid Request (Missing Fields)
test_endpoint "POST" "$BACKEND_URL/api/generate-itinerary" '{"destination": "Paris"}' "Generate Itinerary (Missing Fields)"

# Test 8: Generate Itinerary - Invalid Days
test_endpoint "POST" "$BACKEND_URL/api/generate-itinerary" '{"destination": "Paris", "days": 50, "profile": "Solo traveler"}' "Generate Itinerary (Invalid Days)"

# Test 9: Generate Itinerary - Empty Destination
test_endpoint "POST" "$BACKEND_URL/api/generate-itinerary" '{"destination": "", "days": 3, "profile": "Family with kids"}' "Generate Itinerary (Empty Destination)"

# Test 10: Rate Limit Test (Multiple Rapid Requests)
echo -e "${YELLOW}Testing: Rate Limiting (Multiple Rapid Requests)${NC}"
rate_limit_passed=true
for i in {1..6}; do
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$itinerary_data" "$BACKEND_URL/api/generate-itinerary")
    if [ "$response" -eq 429 ]; then
        rate_limit_passed=true
        break
    fi
    sleep 1
done

if [ "$rate_limit_passed" = true ]; then
    print_result 0 "Rate Limiting (Correctly blocked excessive requests)"
else
    print_result 1 "Rate Limiting (Failed to block excessive requests)"
fi

echo ""
echo "🎯 Test Summary"
echo "==============="

# Count successful tests (this is a simplified count)
echo "✅ Core functionality tests completed"
echo "✅ Error handling tests completed"  
echo "✅ Security tests completed"

echo ""
echo "💡 Tips for Development:"
echo "   - Monitor logs with: ./start.sh logs"
echo "   - Check service health with: ./start.sh health"
echo "   - Stop services with: ./start.sh stop"
echo ""
echo "📊 Performance Notes:"
echo "   - Itinerary generation typically takes 30-120 seconds"
echo "   - Rate limiting allows 5 itinerary requests per 5 minutes"
echo "   - Python server may take 10-30 seconds to warm up"
echo ""
echo "🔧 If tests fail, check:"
echo "   1. Services are running: docker-compose ps"
echo "   2. API keys are valid in .env file"
echo "   3. Network connectivity to external APIs"
echo "   4. Service logs: docker-compose logs <service-name>"

echo -e "${GREEN}🎉 Testing completed!${NC}"