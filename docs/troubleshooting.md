# Aquascene Waitlist Troubleshooting Guide

## Overview

This guide provides solutions to common issues, debugging procedures, and maintenance tasks for the Aquascene Waitlist application.

## Quick Diagnostics

### Health Check Commands
```bash
# Check application status
curl -I https://yourdomain.com/api/waitlist?key=your_admin_key

# Test API endpoint
curl -X POST https://yourdomain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","experience":"beginner","interests":["3d_design"],"gdprConsent":true}'

# Check logs (Vercel)
vercel logs

# Check logs (local development)
npm run dev
```

### System Status Checklist
- [ ] API endpoints responding
- [ ] Database connection active (if applicable)
- [ ] Email service operational
- [ ] SSL certificate valid
- [ ] Environment variables set correctly

## Common Issues & Solutions

### 1. API Endpoint Issues

#### Issue: 500 Internal Server Error
**Symptoms:**
- API returns 500 status code
- Generic error message
- Server logs show unhandled exceptions

**Possible Causes:**
- Missing environment variables
- Database connection failure
- Email service configuration issues
- Unhandled promise rejections

**Solution Steps:**
1. **Check Environment Variables**
```bash
# Verify all required variables are set
echo $RESEND_API_KEY
echo $ADMIN_KEY
echo $NODE_ENV

# For Vercel
vercel env ls
```

2. **Check Application Logs**
```bash
# Vercel logs
vercel logs --follow

# Local development
tail -f .next/trace

# Look for specific error patterns:
# - "RESEND_API_KEY not found"
# - "Database connection failed"
# - "Unhandled promise rejection"
```

3. **Validate Email Configuration**
```bash
# Test Resend API key
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@yourdomain.com",
    "to": "test@example.com",
    "subject": "Test Email",
    "text": "This is a test email"
  }'
```

#### Issue: 429 Rate Limit Errors
**Symptoms:**
- Users getting "Too many requests" error
- Rate limit triggered unexpectedly
- Legitimate users blocked

**Possible Causes:**
- Rate limit too restrictive
- Bot attacks
- Shared IP addresses (corporate networks)
- Rate limit logic bug

**Solution Steps:**
1. **Check Rate Limit Configuration**
```typescript
// In validations.ts, verify rate limit settings
const rateLimitCheck = createRateLimitCheck(5, 60 * 60 * 1000); // 5 per hour
```

2. **Analyze Request Patterns**
```bash
# Check logs for suspicious patterns
grep "Rate limit" logs.txt | head -20

# Look for:
# - Multiple requests from same IP
# - Unusual request timing patterns
# - Bot user agents
```

3. **Adjust Rate Limiting**
```typescript
// Temporary: Increase rate limit
const rateLimitCheck = createRateLimitCheck(10, 60 * 60 * 1000);

// Better: Implement sliding window or user-based limits
```

4. **Implement Rate Limit Bypass**
```typescript
// Add whitelist for known good IPs
const whitelistedIPs = ['192.168.1.1', '10.0.0.1'];

function getClientIP(request: NextRequest): string {
  // ... existing code
  
  if (whitelistedIPs.includes(clientIP)) {
    return 'whitelisted'; // Bypass rate limiting
  }
  
  return clientIP;
}
```

#### Issue: 400 Validation Errors
**Symptoms:**
- Forms rejecting valid data
- Inconsistent validation behavior
- Users unable to submit

**Possible Causes:**
- Zod schema too restrictive
- Client-server validation mismatch
- Special characters in names
- Internationalization issues

**Solution Steps:**
1. **Test Validation Schema**
```typescript
// Test problematic data
import { waitlistSchema } from '@/lib/validations';

const testData = {
  name: "José María O'Connor", // Special characters
  email: "test@example.com",
  experience: "intermediate",
  interests: ["3d_design"],
  gdprConsent: true
};

const result = waitlistSchema.safeParse(testData);
console.log(result);
```

2. **Update Name Validation**
```typescript
// More permissive name validation
name: z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\u0400-\u04FF\u4e00-\u9fff\s'-.,]+$/, 
    'Please enter a valid name'),
```

3. **Debug Client Data**
```javascript
// Add logging to form submission
const handleSubmit = async (data) => {
  console.log('Submitting data:', JSON.stringify(data, null, 2));
  // ... rest of submit logic
};
```

### 2. Email Delivery Issues

#### Issue: Emails Not Being Sent
**Symptoms:**
- Users not receiving welcome emails
- Admin not getting notifications
- No email errors in logs

**Possible Causes:**
- Invalid Resend API key
- Email addresses blocked
- Domain not verified
- Email service limits exceeded

**Solution Steps:**
1. **Verify Resend Configuration**
```bash
# Test API key validity
curl -X GET "https://api.resend.com/domains" \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY"

# Should return 200 with domain list
```

2. **Check Email Logs**
```javascript
// Add detailed email logging
async function sendWelcomeEmail(entry) {
  try {
    console.log('Attempting to send email to:', entry.email);
    
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: entry.email,
      subject: 'Welcome to 3vantage Aquascaping!',
      html: emailTemplate
    });
    
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      email: entry.email,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}
```

3. **Verify Domain Setup**
```bash
# Check DNS records for email domain
dig TXT yourdomain.com | grep -i spf
dig TXT yourdomain.com | grep -i dkim
dig TXT _dmarc.yourdomain.com
```

4. **Test with Different Email Providers**
```javascript
// Test with various email providers
const testEmails = [
  'test@gmail.com',
  'test@yahoo.com',
  'test@outlook.com',
  'test@protonmail.com'
];

for (const email of testEmails) {
  // Send test email and check delivery
}
```

#### Issue: Emails Going to Spam
**Symptoms:**
- Users report not receiving emails
- Emails found in spam folders
- Low email engagement rates

**Solution Steps:**
1. **Improve Email Authentication**
```dns
# Add SPF record
yourdomain.com. TXT "v=spf1 include:_spf.resend.com ~all"

# Add DKIM record (provided by Resend)
resend._domainkey.yourdomain.com. TXT "v=DKIM1; k=rsa; p=..."

# Add DMARC record
_dmarc.yourdomain.com. TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"
```

2. **Optimize Email Content**
```html
<!-- Reduce spam trigger words -->
<!-- Before -->
<h1>FREE! AMAZING OFFER! CLICK NOW!</h1>

<!-- After -->
<h1>Welcome to 3vantage Aquascaping</h1>
```

3. **Monitor Email Reputation**
```bash
# Check sender reputation
curl -X GET "https://api.resend.com/domains/yourdomain.com/reputation" \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY"
```

### 3. Database Issues (If Applicable)

#### Issue: Connection Timeouts
**Symptoms:**
- Slow API responses
- Connection timeout errors
- Database connection pool exhausted

**Solution Steps:**
1. **Check Database Status**
```sql
-- Check active connections
SHOW PROCESSLIST;

-- Check table locks
SHOW OPEN TABLES WHERE In_use > 0;

-- Check slow queries
SHOW FULL PROCESSLIST;
```

2. **Optimize Connection Pool**
```javascript
// Prisma configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'error', 'warn'],
});

// Connection pool settings
const poolSize = process.env.DATABASE_POOL_SIZE || 5;
```

3. **Add Connection Retry Logic**
```javascript
async function connectWithRetry(retries = 3) {
  try {
    await prisma.$connect();
    return prisma;
  } catch (error) {
    if (retries > 0) {
      console.log(`Database connection failed, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return connectWithRetry(retries - 1);
    }
    throw error;
  }
}
```

### 4. Performance Issues

#### Issue: Slow API Response Times
**Symptoms:**
- Response times > 2000ms
- Users experiencing delays
- Timeout errors

**Possible Causes:**
- Database query inefficiency
- Email sending blocking requests
- Memory leaks
- Network latency

**Solution Steps:**
1. **Profile API Performance**
```javascript
// Add performance monitoring
export async function POST(request) {
  const startTime = Date.now();
  
  try {
    // ... existing logic
    
    const endTime = Date.now();
    console.log(`API response time: ${endTime - startTime}ms`);
    
    return response;
  } catch (error) {
    const endTime = Date.now();
    console.log(`API error time: ${endTime - startTime}ms`);
    throw error;
  }
}
```

2. **Optimize Email Sending**
```javascript
// Send emails asynchronously
Promise.all([
  sendWelcomeEmail(newEntry),
  sendOwnerNotification(newEntry)
]).catch(error => {
  console.error('Failed to send emails:', error);
  // Don't block the response
});

// Return response immediately
return NextResponse.json(successResponse, { status: 201 });
```

3. **Implement Caching**
```javascript
// Cache waitlist statistics
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request) {
  const cacheKey = 'waitlist-stats';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }
  
  const stats = generateStats();
  cache.set(cacheKey, { data: stats, timestamp: Date.now() });
  
  return NextResponse.json(stats);
}
```

4. **Database Query Optimization**
```javascript
// Add database indexes
CREATE INDEX idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_created_at ON waitlist_entries(created_at);

// Optimize queries
const recentEntries = await prisma.waitlistEntry.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    experience: true,
    position: true,
    createdAt: true
  },
  orderBy: { createdAt: 'desc' },
  take: 10
});
```

### 5. Security Issues

#### Issue: Suspected Bot Activity
**Symptoms:**
- Unusual traffic patterns
- Rapid form submissions
- Fake email addresses
- Honeypot field filled

**Solution Steps:**
1. **Analyze Request Patterns**
```bash
# Check for bot patterns in logs
grep -E "(bot|crawler|spider)" access.log
grep -E "User-Agent.*bot" access.log

# Check for rapid submissions
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -10
```

2. **Enhance Bot Detection**
```javascript
// Improved bot detection
function detectBot(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const acceptHeader = request.headers.get('accept') || '';
  
  // Check for common bot patterns
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /python/i, /curl/i, /wget/i
  ];
  
  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  const hasNoAcceptHeader = !acceptHeader.includes('text/html');
  
  return isBot || hasNoAcceptHeader;
}

// Use in API route
if (detectBot(request)) {
  return NextResponse.json(
    { message: 'Bot detected' },
    { status: 403 }
  );
}
```

3. **Implement CAPTCHA** (if needed)
```javascript
// Add reCAPTCHA verification
import { verifyRecaptcha } from '@/lib/recaptcha';

const recaptchaValid = await verifyRecaptcha(data.recaptchaToken);
if (!recaptchaValid) {
  return NextResponse.json(
    { message: 'CAPTCHA verification failed' },
    { status: 400 }
  );
}
```

#### Issue: High Error Rates
**Symptoms:**
- Increased 4xx/5xx responses
- Users reporting errors
- Unusual traffic spikes

**Solution Steps:**
1. **Error Analysis**
```bash
# Analyze error patterns
grep "ERROR" logs.txt | awk '{print $NF}' | sort | uniq -c | sort -nr

# Check for attack patterns
grep -E "(DROP|SELECT|UNION|<script)" logs.txt
```

2. **Implement Error Monitoring**
```javascript
// Enhanced error logging
function logError(error, context) {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context: context,
    timestamp: new Date().toISOString(),
    userAgent: context.request?.headers.get('user-agent'),
    ip: getClientIP(context.request)
  };
  
  console.error('Application Error:', JSON.stringify(errorInfo, null, 2));
  
  // Send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { extra: errorInfo });
  }
}
```

## Debugging Procedures

### 1. API Request Debugging

#### Enable Debug Logging
```javascript
// Add to API route
const DEBUG = process.env.NODE_ENV === 'development';

export async function POST(request) {
  if (DEBUG) {
    console.log('Headers:', Object.fromEntries(request.headers.entries()));
    console.log('Method:', request.method);
    console.log('URL:', request.url);
  }
  
  const body = await request.json();
  
  if (DEBUG) {
    console.log('Request body:', JSON.stringify(body, null, 2));
  }
  
  // ... rest of logic
}
```

#### Request/Response Logging
```javascript
// Middleware for request logging
export function middleware(request) {
  const start = Date.now();
  
  console.log(`${request.method} ${request.url} - Started`);
  
  return NextResponse.next().then(response => {
    const duration = Date.now() - start;
    console.log(`${request.method} ${request.url} - ${response.status} - ${duration}ms`);
    return response;
  });
}
```

### 2. Database Debugging (If Applicable)

#### Query Logging
```javascript
// Enable Prisma query logging
const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Duration: ' + e.duration + 'ms');
});
```

#### Connection Monitoring
```javascript
// Monitor database connections
setInterval(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection: OK');
  } catch (error) {
    console.error('Database connection: FAILED', error.message);
  }
}, 30000); // Check every 30 seconds
```

### 3. Email Debugging

#### Email Queue Monitoring
```javascript
// Track email sending
const emailQueue = [];

async function sendEmailWithTracking(emailData) {
  const trackingId = generateId();
  
  emailQueue.push({
    id: trackingId,
    status: 'pending',
    timestamp: new Date(),
    ...emailData
  });
  
  try {
    const result = await resend.emails.send(emailData);
    
    // Update queue
    const queueItem = emailQueue.find(item => item.id === trackingId);
    if (queueItem) {
      queueItem.status = 'sent';
      queueItem.result = result;
    }
    
    return result;
  } catch (error) {
    const queueItem = emailQueue.find(item => item.id === trackingId);
    if (queueItem) {
      queueItem.status = 'failed';
      queueItem.error = error.message;
    }
    throw error;
  }
}

// Email queue status endpoint
export async function GET(request) {
  if (request.url.includes('/debug/email-queue')) {
    return NextResponse.json({
      total: emailQueue.length,
      pending: emailQueue.filter(e => e.status === 'pending').length,
      sent: emailQueue.filter(e => e.status === 'sent').length,
      failed: emailQueue.filter(e => e.status === 'failed').length,
      recent: emailQueue.slice(-10)
    });
  }
}
```

## Performance Monitoring

### 1. Response Time Monitoring
```javascript
// Custom performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }
  
  startTimer(operation) {
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      this.recordMetric(operation, duration);
      return duration;
    };
  }
  
  recordMetric(operation, duration) {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    
    const measurements = this.metrics.get(operation);
    measurements.push(duration);
    
    // Keep only last 100 measurements
    if (measurements.length > 100) {
      measurements.shift();
    }
  }
  
  getStats(operation) {
    const measurements = this.metrics.get(operation) || [];
    if (measurements.length === 0) return null;
    
    const sorted = [...measurements].sort((a, b) => a - b);
    const avg = measurements.reduce((a, b) => a + b) / measurements.length;
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    
    return { avg, p95, count: measurements.length };
  }
}

const monitor = new PerformanceMonitor();

// Usage in API routes
export async function POST(request) {
  const endTimer = monitor.startTimer('waitlist_post');
  
  try {
    // ... API logic
    
    const duration = endTimer();
    if (duration > 1000) {
      console.warn(`Slow API response: ${duration}ms`);
    }
    
    return response;
  } catch (error) {
    endTimer();
    throw error;
  }
}
```

### 2. Memory Usage Monitoring
```javascript
// Memory usage monitoring
function logMemoryUsage() {
  const usage = process.memoryUsage();
  console.log({
    rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
    external: Math.round(usage.external / 1024 / 1024) + ' MB'
  });
}

// Log memory usage every 5 minutes
setInterval(logMemoryUsage, 5 * 60 * 1000);
```

## Recovery Procedures

### 1. Service Recovery
```bash
# Restart application (PM2)
pm2 restart aquascene-waitlist

# Restart application (Vercel)
vercel --prod

# Clear application cache
redis-cli FLUSHALL  # If using Redis

# Restart database connections
# (Platform specific)
```

### 2. Data Recovery
```bash
# Restore from backup (example)
mongorestore --uri="mongodb://connection" --db=aquascene backup/

# Verify data integrity
npm run db:check-integrity

# Rebuild indexes
npm run db:rebuild-indexes
```

## Preventive Maintenance

### 1. Regular Health Checks
```bash
#!/bin/bash
# health-check.sh

echo "Checking API health..."
API_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com/api/waitlist?key=$ADMIN_KEY)
if [ $API_RESPONSE -eq 200 ]; then
  echo "✓ API is healthy"
else
  echo "✗ API is unhealthy (HTTP $API_RESPONSE)"
fi

echo "Checking email service..."
# Test email sending logic here

echo "Checking SSL certificate..."
SSL_EXPIRY=$(openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
echo "SSL expires: $SSL_EXPIRY"
```

### 2. Performance Optimization
```javascript
// Regular performance cleanup
setInterval(() => {
  // Clear old rate limit entries
  rateLimitMap.forEach((value, key) => {
    if (Date.now() > value.resetTime) {
      rateLimitMap.delete(key);
    }
  });
  
  // Clear old waitlist entries (if using in-memory storage)
  // Only in development - use database in production
  
  // Log current performance stats
  console.log('Performance stats:', monitor.getStats('waitlist_post'));
}, 60 * 60 * 1000); // Every hour
```

This comprehensive troubleshooting guide should help diagnose and resolve most issues that may arise with the Aquascene Waitlist application.