# Aquascene Waitlist Deployment Checklist

## Overview

This checklist ensures a smooth and secure deployment of the Aquascene Waitlist application. Follow all sections for both initial deployments and updates.

## Pre-Deployment Checklist

### 1. Code Quality & Testing

#### Code Review
- [ ] All code changes have been peer-reviewed
- [ ] No console.log statements in production code
- [ ] No hardcoded secrets or API keys
- [ ] Error handling is comprehensive
- [ ] TypeScript compilation passes without errors

#### Testing Verification
- [ ] All unit tests pass (`npm test`)
- [ ] Integration tests completed successfully
- [ ] Manual testing of critical paths completed
- [ ] Load testing results within acceptable limits
- [ ] Security testing completed (SQL injection, XSS, etc.)
- [ ] Email functionality tested with real email provider

#### Performance Checks
- [ ] Bundle size analysis completed
- [ ] No memory leaks detected
- [ ] Database queries optimized (if applicable)
- [ ] API response times under 500ms (95th percentile)
- [ ] Rate limiting tested and working

### 2. Environment Configuration

#### Environment Variables
```bash
# Required Production Variables
RESEND_API_KEY=            # Resend API key for email
ADMIN_KEY=                 # Strong admin key (min 32 characters)
NODE_ENV=production        # Production environment
NEXT_PUBLIC_BASE_URL=      # Production domain

# Optional Variables
RESEND_FROM_EMAIL=         # Sender email address
RESEND_TO_EMAIL=           # Admin notification email
DATABASE_URL=              # If using database (recommended)
REDIS_URL=                 # If using Redis for rate limiting
```

#### Environment Security
- [ ] All environment variables are properly set
- [ ] Admin key is strong (min 32 characters, alphanumeric + symbols)
- [ ] API keys are valid and have appropriate permissions
- [ ] No development keys are used in production
- [ ] Environment variables are secured in deployment platform

#### Domain & SSL
- [ ] Domain is properly configured
- [ ] SSL certificate is valid and auto-renewing
- [ ] HTTPS redirects are working
- [ ] DNS records are properly set
- [ ] CDN configuration (if applicable)

### 3. Dependencies & Security

#### Package Security
- [ ] `npm audit` shows no high/critical vulnerabilities
- [ ] All dependencies are up to date
- [ ] No dev dependencies in production build
- [ ] Package-lock.json is committed and up to date

#### Security Headers
- [ ] CORS settings are properly configured
- [ ] Security headers are implemented
- [ ] Rate limiting is active
- [ ] Input validation is comprehensive

### 4. Database & Storage (If Applicable)

#### Database Setup
- [ ] Production database is provisioned
- [ ] Database connection string is correct
- [ ] Database migrations are ready
- [ ] Backup strategy is in place
- [ ] Database user has minimal required permissions

#### Data Migration
- [ ] Existing waitlist data backed up
- [ ] Migration scripts tested
- [ ] Rollback plan prepared
- [ ] Data integrity checks planned

### 5. Monitoring & Logging

#### Application Monitoring
- [ ] Error tracking configured (Sentry, Bugsnag, etc.)
- [ ] Performance monitoring setup
- [ ] Uptime monitoring configured
- [ ] Log aggregation setup

#### Alerts Configuration
- [ ] API response time alerts (>1000ms)
- [ ] Error rate alerts (>1%)
- [ ] Server resource alerts (CPU, Memory)
- [ ] Email delivery failure alerts

## Deployment Process

### 1. Vercel Deployment (Recommended)

#### Initial Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables Setup
```bash
# Set production environment variables
vercel env add RESEND_API_KEY production
vercel env add ADMIN_KEY production
vercel env add RESEND_FROM_EMAIL production
vercel env add RESEND_TO_EMAIL production

# Verify environment variables
vercel env ls
```

#### Domain Configuration
```bash
# Add custom domain
vercel domains add yourdomain.com

# Add domain to project
vercel alias set your-project-url.vercel.app yourdomain.com
```

### 2. Alternative Deployment Platforms

#### Netlify
```bash
# Build command
npm run build

# Deploy command
npm run start

# Environment variables
# Set via Netlify dashboard under Site settings > Environment variables
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy

# Set environment variables
railway variables set RESEND_API_KEY=your_key
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and deploy
docker build -t aquascene-waitlist .
docker run -p 3000:3000 --env-file .env.production aquascene-waitlist
```

### 3. Database Migration (If Applicable)

#### Prisma Migration
```bash
# Apply migrations
npx prisma migrate deploy

# Generate client
npx prisma generate

# Seed database (if needed)
npx prisma db seed
```

#### Manual Database Setup
```sql
-- Create waitlist table
CREATE TABLE waitlist_entries (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  experience ENUM('beginner', 'intermediate', 'advanced', 'professional') NOT NULL,
  interests JSON NOT NULL,
  gdpr_consent BOOLEAN NOT NULL DEFAULT TRUE,
  marketing_consent BOOLEAN DEFAULT FALSE,
  referral_source VARCHAR(255),
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index for email lookups
CREATE INDEX idx_waitlist_email ON waitlist_entries(email);

-- Create index for position queries
CREATE INDEX idx_waitlist_position ON waitlist_entries(position);
```

## Post-Deployment Verification

### 1. Functional Testing

#### API Endpoints
- [ ] POST /api/waitlist responds correctly
- [ ] GET /api/waitlist (admin) works with proper authentication
- [ ] Rate limiting is functioning (test 6 requests rapidly)
- [ ] Error handling works (test invalid data)

#### Email Functionality
- [ ] Welcome emails are being sent
- [ ] Owner notifications are working
- [ ] Email templates render correctly
- [ ] Email delivery rates are acceptable (>95%)

#### Frontend Integration
- [ ] Waitlist form submission works
- [ ] Success/error messages display correctly
- [ ] Form validation works client-side
- [ ] Responsive design works on mobile devices

### 2. Performance Verification

#### Response Times
```bash
# Test API response time
curl -w "@curl-format.txt" -o /dev/null -s \
  -X POST https://yourdomain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Performance Test",
    "email": "perf@example.com",
    "experience": "intermediate",
    "interests": ["3d_design"],
    "gdprConsent": true
  }'
```

#### Load Testing
```bash
# Run Artillery load test
artillery run production-load-test.yml

# Expected results:
# - Response time p95 < 500ms
# - Success rate > 99%
# - No memory leaks
```

### 3. Security Verification

#### SSL/TLS Testing
```bash
# Test SSL configuration
curl -I https://yourdomain.com
nmap --script ssl-enum-ciphers -p 443 yourdomain.com
```

#### Security Headers
```bash
# Check security headers
curl -I https://yourdomain.com/api/waitlist

# Expected headers:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

#### Input Validation
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] Malformed JSON handled gracefully
- [ ] Rate limiting enforces correctly

### 4. Monitoring Setup Verification

#### Health Checks
```bash
# Create health check endpoint test
curl https://yourdomain.com/api/health

# Set up monitoring:
# - Uptime monitoring (Pingdom, UptimeRobot)
# - APM (New Relic, Datadog)
# - Error tracking (Sentry)
```

#### Log Verification
- [ ] Application logs are being collected
- [ ] Error logs are properly formatted
- [ ] Log rotation is configured
- [ ] Sensitive data is not logged

## Rollback Plan

### 1. Immediate Rollback Procedures

#### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# Or promote specific deployment
vercel promote [deployment-url]
```

#### Database Rollback (If Applicable)
```bash
# Revert database migration
npx prisma migrate reset

# Restore from backup
# (Platform-specific commands)
```

### 2. Rollback Triggers

Execute rollback if:
- [ ] Error rate exceeds 5%
- [ ] Response time exceeds 2000ms (p95)
- [ ] Email delivery fails completely
- [ ] Security vulnerability detected
- [ ] Data corruption detected

### 3. Communication Plan

#### Stakeholder Notification
- [ ] Development team notified
- [ ] Product owner informed
- [ ] Users notified (if significant impact)
- [ ] Status page updated

## Post-Deployment Tasks

### 1. Documentation Updates

- [ ] Update deployment documentation
- [ ] Update API documentation with new endpoints
- [ ] Update environment variable documentation
- [ ] Create/update runbooks

### 2. Monitoring Configuration

#### Set Up Alerts
```javascript
// Example monitoring configuration
const alerts = {
  responseTime: {
    threshold: 1000, // ms
    duration: 5, // minutes
    action: 'email_team'
  },
  errorRate: {
    threshold: 1, // percent
    duration: 2, // minutes
    action: 'slack_alert'
  },
  emailDelivery: {
    threshold: 95, // percent
    duration: 15, // minutes
    action: 'page_oncall'
  }
};
```

#### Dashboard Setup
- [ ] Response time dashboard
- [ ] Error rate monitoring
- [ ] Waitlist growth metrics
- [ ] Email delivery rates
- [ ] User experience metrics

### 3. Performance Optimization

#### Analyze Production Metrics
- [ ] Identify bottlenecks
- [ ] Optimize slow queries
- [ ] Configure caching strategies
- [ ] Plan capacity scaling

#### Continuous Improvement
- [ ] Schedule regular performance reviews
- [ ] Plan A/B tests for optimizations
- [ ] Set up automated performance regression testing

## Maintenance Schedule

### Weekly Tasks
- [ ] Review error logs
- [ ] Check performance metrics
- [ ] Verify backup integrity
- [ ] Update dependencies (non-breaking)

### Monthly Tasks
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Capacity planning review
- [ ] Documentation updates

### Quarterly Tasks
- [ ] Major dependency updates
- [ ] Security penetration testing
- [ ] Disaster recovery testing
- [ ] Architecture review

## Emergency Contacts

### Technical Team
- **Lead Developer**: [Name] - [Phone] - [Email]
- **DevOps Engineer**: [Name] - [Phone] - [Email]
- **Product Owner**: [Name] - [Phone] - [Email]

### Service Providers
- **Hosting Provider**: [Support Contact]
- **Email Provider**: [Resend Support]
- **Domain Registrar**: [Support Contact]
- **CDN Provider**: [Support Contact]

## Compliance & Legal

### Data Protection
- [ ] GDPR compliance verified
- [ ] Privacy policy updated
- [ ] Data retention policies implemented
- [ ] User consent mechanisms working

### Terms of Service
- [ ] Terms of service updated
- [ ] Cookie policy updated
- [ ] Data processing agreements signed

This comprehensive deployment checklist ensures a secure, reliable, and maintainable deployment of the Aquascene Waitlist application.