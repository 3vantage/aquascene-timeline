# Aquascene Waitlist Testing Guide

## Overview

This guide covers manual and automated testing procedures for the Aquascene Waitlist API. It includes test cases, performance benchmarks, and continuous testing strategies.

## Test Environment Setup

### Prerequisites
- Node.js 18+ installed
- Access to the application
- Postman or similar API testing tool
- Admin API key for protected endpoints

### Environment Configuration
```bash
# Development environment
export NODE_ENV=development
export RESEND_API_KEY=test_key
export ADMIN_KEY=test_admin_key
export RESEND_FROM_EMAIL=test@example.com
export RESEND_TO_EMAIL=admin@example.com
```

### Test Data Preparation
```bash
# Start the development server
npm run dev

# Verify server is running
curl http://localhost:3000/api/waitlist?key=test_admin_key
```

## Manual Testing Procedures

### 1. Waitlist Subscription Testing

#### Test Case 1.1: Valid Subscription
**Objective**: Verify successful waitlist subscription with valid data

**Test Data**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "experience": "intermediate",
  "interests": ["3d_design", "ai_assistant"],
  "gdprConsent": true,
  "marketingConsent": true,
  "referralSource": "manual_test"
}
```

**Expected Result**:
- Status: 201 Created
- Response contains position and totalSubscribers
- Welcome email sent (check logs)
- Owner notification sent (check logs)

**cURL Command**:
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "experience": "intermediate",
    "interests": ["3d_design", "ai_assistant"],
    "gdprConsent": true,
    "marketingConsent": true,
    "referralSource": "manual_test"
  }' | jq
```

#### Test Case 1.2: Duplicate Email Subscription
**Objective**: Verify duplicate email handling

**Prerequisites**: Run Test Case 1.1 first

**Test Data**: Same as Test Case 1.1

**Expected Result**:
- Status: 409 Conflict
- Message: "This email is already on the waitlist"
- Position of existing entry returned

#### Test Case 1.3: Invalid Email Format
**Objective**: Verify email validation

**Test Data**:
```json
{
  "name": "Test User",
  "email": "invalid-email",
  "experience": "intermediate",
  "interests": ["3d_design"],
  "gdprConsent": true
}
```

**Expected Result**:
- Status: 400 Bad Request
- Validation error for email field

#### Test Case 1.4: Missing Required Fields
**Objective**: Verify required field validation

**Test Data**:
```json
{
  "name": "",
  "email": "test@example.com"
}
```

**Expected Result**:
- Status: 400 Bad Request
- Multiple validation errors returned

#### Test Case 1.5: Invalid Experience Level
**Objective**: Verify experience enum validation

**Test Data**:
```json
{
  "name": "Test User",
  "email": "test2@example.com",
  "experience": "invalid_level",
  "interests": ["3d_design"],
  "gdprConsent": true
}
```

**Expected Result**:
- Status: 400 Bad Request
- Experience validation error

#### Test Case 1.6: Empty Interests Array
**Objective**: Verify interests validation

**Test Data**:
```json
{
  "name": "Test User",
  "email": "test3@example.com",
  "experience": "beginner",
  "interests": [],
  "gdprConsent": true
}
```

**Expected Result**:
- Status: 400 Bad Request
- Interests validation error

#### Test Case 1.7: GDPR Consent Validation
**Objective**: Verify GDPR consent requirement

**Test Data**:
```json
{
  "name": "Test User",
  "email": "test4@example.com",
  "experience": "beginner",
  "interests": ["3d_design"],
  "gdprConsent": false
}
```

**Expected Result**:
- Status: 400 Bad Request
- GDPR consent validation error

#### Test Case 1.8: Honeypot Spam Detection
**Objective**: Verify anti-spam protection

**Test Data**:
```json
{
  "name": "Spam Bot",
  "email": "spam@example.com",
  "experience": "beginner",
  "interests": ["3d_design"],
  "gdprConsent": true,
  "honeypot": "spam_content"
}
```

**Expected Result**:
- Status: 400 Bad Request
- Message: "Spam detected"

### 2. Rate Limiting Testing

#### Test Case 2.1: Rate Limit Enforcement
**Objective**: Verify rate limiting works correctly

**Procedure**:
1. Send 5 valid requests quickly (should succeed)
2. Send 6th request (should fail with 429)
3. Wait 1 hour and test again (should work)

**Rate Limit Test Script**:
```bash
#!/bin/bash
echo "Testing rate limiting..."

for i in {1..6}; do
  echo "Request $i:"
  response=$(curl -s -w "%{http_code}" -X POST http://localhost:3000/api/waitlist \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Rate Test User '$i'",
      "email": "ratetest'$i'@example.com",
      "experience": "beginner",
      "interests": ["3d_design"],
      "gdprConsent": true
    }')
  
  echo "Response: $response"
  echo "---"
  
  if [[ "$i" -eq 6 ]]; then
    if [[ "$response" == *"429"* ]]; then
      echo "✓ Rate limiting working correctly"
    else
      echo "✗ Rate limiting failed"
    fi
  fi
done
```

### 3. Admin Endpoint Testing

#### Test Case 3.1: Valid Admin Access
**Objective**: Verify admin statistics endpoint with valid key

**cURL Command**:
```bash
curl -X GET "http://localhost:3000/api/waitlist?key=test_admin_key" | jq
```

**Expected Result**:
- Status: 200 OK
- Statistics object with all required fields

#### Test Case 3.2: Invalid Admin Key
**Objective**: Verify unauthorized access protection

**cURL Command**:
```bash
curl -X GET "http://localhost:3000/api/waitlist?key=invalid_key" | jq
```

**Expected Result**:
- Status: 401 Unauthorized
- Message: "Unauthorized"

#### Test Case 3.3: Missing Admin Key
**Objective**: Verify key requirement

**cURL Command**:
```bash
curl -X GET "http://localhost:3000/api/waitlist" | jq
```

**Expected Result**:
- Status: 401 Unauthorized

## Automated Testing

### Jest Test Suite Setup

#### Package Installation
```bash
npm install --save-dev jest @types/jest jest-environment-jsdom
npm install --save-dev supertest @types/supertest
```

#### Jest Configuration (jest.config.js)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
}

module.exports = createJestConfig(customJestConfig)
```

#### API Test Suite Example
```javascript
// __tests__/api/waitlist.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/waitlist/route';

describe('/api/waitlist', () => {
  describe('POST', () => {
    it('should create a waitlist entry with valid data', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          experience: 'intermediate',
          interests: ['3d_design'],
          gdprConsent: true,
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.message).toBe('Successfully joined the waitlist!');
      expect(data.position).toBe(1);
    });

    it('should reject invalid email', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'invalid-email',
          experience: 'intermediate',
          interests: ['3d_design'],
          gdprConsent: true,
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.message).toBe('Validation failed');
    });

    it('should detect duplicate emails', async () => {
      // First request
      const { req: req1, res: res1 } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'duplicate@example.com',
          experience: 'intermediate',
          interests: ['3d_design'],
          gdprConsent: true,
        },
      });

      await handler(req1, res1);
      expect(res1._getStatusCode()).toBe(201);

      // Duplicate request
      const { req: req2, res: res2 } = createMocks({
        method: 'POST',
        body: {
          name: 'Another User',
          email: 'duplicate@example.com',
          experience: 'beginner',
          interests: ['ai_assistant'],
          gdprConsent: true,
        },
      });

      await handler(req2, res2);
      expect(res2._getStatusCode()).toBe(409);
    });
  });

  describe('GET', () => {
    it('should return stats with valid admin key', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { key: process.env.ADMIN_KEY },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data).toHaveProperty('totalEntries');
      expect(data).toHaveProperty('experienceBreakdown');
    });

    it('should reject invalid admin key', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { key: 'invalid-key' },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(401);
    });
  });
});
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- waitlist.test.ts
```

## Load Testing

### Using Artillery.js

#### Installation
```bash
npm install -g artillery
```

#### Load Test Configuration (artillery.yml)
```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 10
      name: "Load test"
    - duration: 60
      arrivalRate: 20
      name: "Spike test"
  processor: "./test-processor.js"

scenarios:
  - name: "Subscribe to waitlist"
    weight: 100
    flow:
      - post:
          url: "/api/waitlist"
          json:
            name: "{{ $randomString() }}"
            email: "{{ $randomString() }}@example.com"
            experience: "{{ $randomElement(['beginner', 'intermediate', 'advanced', 'professional']) }}"
            interests: ["3d_design"]
            gdprConsent: true
            marketingConsent: "{{ $randomBoolean() }}"
          capture:
            - json: "$.position"
              as: "position"
          expect:
            - statusCode: [201, 409]
```

#### Test Processor (test-processor.js)
```javascript
module.exports = {
  randomString: () => Math.random().toString(36).substring(7),
  randomBoolean: () => Math.random() > 0.5,
  randomElement: (arr) => arr[Math.floor(Math.random() * arr.length)]
};
```

#### Running Load Tests
```bash
# Basic load test
artillery run artillery.yml

# Generate HTML report
artillery run artillery.yml --output report.json
artillery report report.json
```

### Performance Benchmarks

#### Expected Response Times
- **POST /api/waitlist**: < 500ms (95th percentile)
- **GET /api/waitlist**: < 100ms (95th percentile)
- **Rate limit check**: < 5ms

#### Throughput Targets
- **Normal load**: 50 requests/minute
- **Peak load**: 200 requests/minute
- **Rate limit threshold**: 5 requests/hour per IP

## Email Testing

### Manual Email Verification

#### Test Email Delivery
```bash
# Test with real email provider
export RESEND_API_KEY=your_real_api_key
export RESEND_FROM_EMAIL=test@yourdomain.com
export RESEND_TO_EMAIL=your-email@example.com

# Submit test entry
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Email Test User",
    "email": "test-recipient@example.com",
    "experience": "intermediate",
    "interests": ["3d_design"],
    "gdprConsent": true,
    "marketingConsent": true
  }'
```

#### Email Content Validation
- [ ] Welcome email received by subscriber
- [ ] Owner notification received by admin
- [ ] Email formatting is correct
- [ ] Links are working
- [ ] Unsubscribe functionality (if implemented)

### Email Testing Tools

#### Using MailHog (Development)
```bash
# Install MailHog
brew install mailhog  # macOS
# or
docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog

# Configure environment
export RESEND_API_KEY=""  # Leave empty to skip real emails
export SMTP_HOST=localhost
export SMTP_PORT=1025

# Access web interface
open http://localhost:8025
```

## Security Testing

### Input Validation Testing

#### SQL Injection Attempts
```bash
# Test with potential SQL injection
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Robert\"; DROP TABLE users; --",
    "email": "test@example.com",
    "experience": "intermediate",
    "interests": ["3d_design"],
    "gdprConsent": true
  }'
```

#### XSS Attempts
```bash
# Test with potential XSS
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<script>alert(\"XSS\")</script>",
    "email": "test@example.com",
    "experience": "intermediate",
    "interests": ["3d_design"],
    "gdprConsent": true
  }'
```

#### Large Payload Testing
```bash
# Test with oversized data
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "'$(head -c 10000 < /dev/zero | tr '\0' 'A')'",
    "email": "test@example.com",
    "experience": "intermediate",
    "interests": ["3d_design"],
    "gdprConsent": true
  }'
```

## Test Reporting

### Test Results Template

#### Manual Test Report
```markdown
# Test Execution Report

**Date**: 2024-01-15
**Environment**: Development
**Tester**: [Name]
**Version**: 1.0.0

## Test Summary
- Total Tests: 15
- Passed: 14
- Failed: 1
- Skipped: 0

## Failed Tests
1. **Test Case 2.1**: Rate limiting enforcement
   - **Issue**: Rate limit not enforced correctly
   - **Expected**: 429 on 6th request
   - **Actual**: 201 on 6th request
   - **Priority**: High

## Performance Results
- Average response time: 245ms
- 95th percentile: 450ms
- Error rate: 0.1%

## Recommendations
1. Fix rate limiting implementation
2. Add monitoring for response times
3. Implement database persistence
```

### Automated Test Reporting

#### GitHub Actions CI/CD
```yaml
# .github/workflows/test.yml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v1
```

## Continuous Testing Strategy

### Development Testing
- Run unit tests on every code change
- Manual smoke tests before commits
- Integration tests on feature branches

### Staging Testing
- Full test suite execution
- Load testing with production-like data
- Security scanning
- Email delivery testing

### Production Testing
- Health checks every 5 minutes
- Synthetic transaction monitoring
- Error rate monitoring
- Performance monitoring

### Monitoring and Alerting
- API response time alerts (>1s)
- Error rate alerts (>1%)
- Rate limit violations
- Email delivery failures

This comprehensive testing guide ensures the Aquascene Waitlist API maintains high quality, security, and performance standards across all environments.