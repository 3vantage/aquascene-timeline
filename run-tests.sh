#!/bin/bash

echo "🧪 Aquascene Waitlist Testing Suite"
echo "=================================="
echo ""

# Check if dev server is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    SERVER_PORT=3000
elif curl -s http://localhost:3004 > /dev/null 2>&1; then
    SERVER_PORT=3004
else
    echo "❌ No development server detected on port 3000 or 3004"
    echo "Please run 'npm run dev' first"
    exit 1
fi

echo "✅ Development server detected on port $SERVER_PORT"
echo ""

# Update config if needed
if [ "$SERVER_PORT" = "3004" ]; then
    echo "📝 Updating test configuration for port 3004..."
    sed -i '' 's/localhost:3000/localhost:3004/g' playwright.config.js
    sed -i '' 's/localhost:3000/localhost:3004/g' tests/*.js
fi

echo "🚀 Running test suite..."
echo ""

# Run each test type
echo "1️⃣ Visual Testing (Screenshots)"
npm run test:visual

echo ""
echo "2️⃣ Interaction Testing"
npm run test:interaction

echo ""
echo "3️⃣ Performance Testing"
npm run test:performance

echo ""
echo "4️⃣ Mobile Testing"
npm run test:mobile

echo ""
echo "5️⃣ Accessibility Testing"
npx playwright test tests/accessibility-test.js --project=chromium

echo ""
echo "📊 Test Results Summary:"
echo "- Screenshots saved in test-results/"
echo "- Full HTML report available: npm run test:report"
echo "- Comprehensive analysis: see TEST-REPORT.md"
echo ""
echo "✅ Testing complete!"