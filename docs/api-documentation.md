# Aquascene Waitlist API Documentation

## Overview

The Aquascene Waitlist API provides endpoints for managing user subscriptions to the Aquascene platform waitlist. The API is built with Next.js 15 and includes comprehensive validation, rate limiting, and email notifications.

**Base URL**: `https://your-domain.com/api`  
**Version**: 1.0  
**Content-Type**: `application/json`

## Authentication

### Admin Endpoints
Admin endpoints require an API key passed as a query parameter:
```
GET /api/waitlist?key=YOUR_ADMIN_KEY
```

## Rate Limiting

- **Limit**: 5 requests per hour per IP address
- **Window**: 3600 seconds (1 hour)
- **Headers**: Rate limit information is returned in error responses
- **Exceeded Response**: 429 Too Many Requests

## Endpoints

### POST /api/waitlist
Subscribe a user to the waitlist.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "experience": "intermediate",
  "interests": ["3d_design", "ai_assistant"],
  "gdprConsent": true,
  "marketingConsent": true,
  "referralSource": "twitter",
  "honeypot": ""
}
```

#### Request Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | User's full name (2-100 chars, letters/spaces only) |
| `email` | string | Yes | Valid email address (max 255 chars) |
| `experience` | enum | Yes | One of: `beginner`, `intermediate`, `advanced`, `professional` |
| `interests` | array | Yes | Array of feature interests (min 1 item) |
| `gdprConsent` | boolean | Yes | Must be `true` for GDPR compliance |
| `marketingConsent` | boolean | No | Optional marketing consent |
| `referralSource` | string | No | How the user found the service |
| `honeypot` | string | No | Anti-spam field (must be empty) |

#### Interest Options
- `3d_design` - 3D Design Tools
- `calculations` - Aquascaping Calculations
- `community` - Community Features
- `mobile_app` - Mobile Application
- `ai_assistant` - AI Assistant

#### Success Response (201 Created)
```json
{
  "message": "Successfully joined the waitlist!",
  "position": 42,
  "totalSubscribers": 42
}
```

#### Error Responses

**400 Bad Request - Validation Error**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    },
    {
      "field": "interests",
      "message": "Please select at least one feature of interest"
    }
  ]
}
```

**400 Bad Request - Spam Detection**
```json
{
  "message": "Spam detected"
}
```

**409 Conflict - Email Already Exists**
```json
{
  "message": "This email is already on the waitlist",
  "position": 15
}
```

**429 Too Many Requests**
```json
{
  "message": "Too many requests. Please try again later.",
  "remainingAttempts": 0
}
```

**500 Internal Server Error**
```json
{
  "message": "Internal server error. Please try again later."
}
```

### GET /api/waitlist
Retrieve waitlist statistics (Admin only).

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Admin API key for authentication |

#### Success Response (200 OK)
```json
{
  "totalEntries": 150,
  "recentEntries": [
    {
      "id": "abc123def456",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "experience": "advanced",
      "position": 150,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "experienceBreakdown": {
    "beginner": 45,
    "intermediate": 67,
    "advanced": 32,
    "professional": 6
  },
  "marketingConsentCount": 120,
  "topInterests": {
    "3d_design": 89,
    "ai_assistant": 76,
    "calculations": 65,
    "community": 54,
    "mobile_app": 43
  }
}
```

#### Error Response (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

## cURL Examples

### Subscribe to Waitlist
```bash
curl -X POST https://your-domain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "experience": "intermediate",
    "interests": ["3d_design", "ai_assistant"],
    "gdprConsent": true,
    "marketingConsent": true,
    "referralSource": "twitter"
  }'
```

### Get Waitlist Stats (Admin)
```bash
curl -X GET "https://your-domain.com/api/waitlist?key=YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

### Test Rate Limiting
```bash
# Send 6 requests quickly to trigger rate limit
for i in {1..6}; do
  curl -X POST https://your-domain.com/api/waitlist \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User '$i'",
      "email": "test'$i'@example.com",
      "experience": "beginner",
      "interests": ["3d_design"],
      "gdprConsent": true
    }'
  echo ""
done
```

## Postman Collection

### Environment Variables
Create these variables in your Postman environment:
```json
{
  "baseUrl": "https://your-domain.com",
  "adminKey": "your-admin-key-here"
}
```

### Collection Structure
```json
{
  "info": {
    "name": "Aquascene Waitlist API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Subscribe to Waitlist",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"{{$randomFullName}}\",\n  \"email\": \"{{$randomEmail}}\",\n  \"experience\": \"intermediate\",\n  \"interests\": [\"3d_design\", \"ai_assistant\"],\n  \"gdprConsent\": true,\n  \"marketingConsent\": true,\n  \"referralSource\": \"postman_test\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/waitlist",
          "host": ["{{baseUrl}}"],
          "path": ["api", "waitlist"]
        }
      }
    },
    {
      "name": "Get Waitlist Stats",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/api/waitlist?key={{adminKey}}",
          "host": ["{{baseUrl}}"],
          "path": ["api", "waitlist"],
          "query": [
            {
              "key": "key",
              "value": "{{adminKey}}"
            }
          ]
        }
      }
    },
    {
      "name": "Test Validation Error",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"A\",\n  \"email\": \"invalid-email\",\n  \"experience\": \"invalid\",\n  \"interests\": [],\n  \"gdprConsent\": false\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/waitlist",
          "host": ["{{baseUrl}}"],
          "path": ["api", "waitlist"]
        }
      }
    }
  ]
}
```

## Email Notifications

### Welcome Email
Sent automatically to new subscribers with:
- Waitlist position confirmation
- What to expect next
- Referral sharing link
- Branded HTML template

### Owner Notification
Sent to admin email with:
- New subscriber details
- Current waitlist statistics
- All form responses

## Security Features

### Input Validation
- Zod schema validation for all fields
- Name validation with Unicode support
- Email format validation
- Experience level enumeration
- Interest array validation

### Anti-Spam Protection
- Honeypot field detection
- Rate limiting by IP address
- Input sanitization
- GDPR consent requirement

### Data Protection
- No sensitive data logging
- Email normalization (lowercase)
- Proper error handling without data leakage

## Environment Variables

### Required
```env
RESEND_API_KEY=your_resend_api_key
ADMIN_KEY=your_admin_key
```

### Optional
```env
RESEND_FROM_EMAIL=waitlist@aquascene.com
RESEND_TO_EMAIL=admin@aquascene.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Performance Considerations

### Response Times
- POST requests: ~200-500ms (including email sending)
- GET requests: ~50-100ms
- Rate limit check: ~1-5ms

### Memory Usage
- In-memory storage for development
- Consider database migration for production
- Email queue for better performance

### Scalability Notes
- Current implementation uses in-memory storage
- For production, migrate to:
  - Database (PostgreSQL/MongoDB)
  - Redis for rate limiting
  - Email queue system
  - CDN for static assets

## Error Handling

### Client Errors (4xx)
- Always return structured error messages
- Include field-level validation errors
- Provide actionable error descriptions

### Server Errors (5xx)
- Generic error messages to prevent information leakage
- Detailed logging for debugging
- Graceful degradation for email failures

## API Versioning

### Current Version: v1
- No version prefix in URLs (implicit v1)
- Breaking changes will introduce v2 prefix
- Backward compatibility maintained for 6 months

### Future Considerations
- Implement API versioning headers
- Semantic versioning for API changes
- Deprecation notices for old endpoints