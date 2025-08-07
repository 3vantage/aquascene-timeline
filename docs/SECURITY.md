# Security Configuration Guide

## Overview
This document outlines the security measures implemented for the Aquascene Waitlist application and provides setup instructions for secure deployment.

## Environment Variables Security

### Required Environment Variables

| Variable | Description | Example | Security Level |
|----------|-------------|---------|----------------|
| `RESEND_API_KEY` | Resend API key for email functionality | `re_abc123...` | **CRITICAL** |
| `RESEND_FROM_EMAIL` | Verified sender email address | `waitlist@yourdomain.com` | Medium |
| `RESEND_TO_EMAIL` | Admin notification email | `admin@yourdomain.com` | Medium |
| `ADMIN_KEY` | API key for admin endpoints | `secure_key_16_chars_min` | **HIGH** |

### Optional Environment Variables

| Variable | Description | Default | Security Level |
|----------|-------------|---------|----------------|
| `RATE_LIMIT_REQUESTS` | Max requests per window | `5` | Low |
| `RATE_LIMIT_WINDOW_MINUTES` | Rate limit window in minutes | `60` | Low |

## GitHub Repository Secrets Setup

### Step 1: Access Repository Settings
1. Navigate to your GitHub repository
2. Click **Settings** tab
3. Select **Secrets and variables** → **Actions**

### Step 2: Add Required Secrets
Add the following repository secrets:

```
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=waitlist@yourdomain.com  
RESEND_TO_EMAIL=admin@yourdomain.com
ADMIN_KEY=your_secure_admin_key_minimum_16_chars
```

### Step 3: Verify Secrets
Secrets should appear as:
- ✅ `RESEND_API_KEY`
- ✅ `RESEND_FROM_EMAIL`
- ✅ `RESEND_TO_EMAIL`  
- ✅ `ADMIN_KEY`

## Security Features Implemented

### 1. API Key Protection
- ✅ No hardcoded API keys in source code
- ✅ Environment variable validation
- ✅ Centralized configuration in `/src/lib/resend.ts`
- ✅ Masked logging of sensitive values

### 2. Rate Limiting
- ✅ IP-based rate limiting (5 requests/hour by default)
- ✅ Configurable limits via environment variables
- ✅ Proper HTTP status codes (429 Too Many Requests)
- ✅ Retry-After headers

### 3. Input Validation & Sanitization
- ✅ Zod schema validation for all inputs
- ✅ Honeypot field for bot detection
- ✅ GDPR consent validation
- ✅ Email format validation
- ✅ XSS protection through React's built-in escaping

### 4. Security Headers
- ✅ Unique entity reference IDs for emails
- ✅ Rate limit headers in responses
- ✅ Proper error handling without information leakage

### 5. Bot Protection
- ✅ Honeypot field (hidden from users)
- ✅ Silent bot rejection (returns fake success)
- ✅ IP address logging for monitoring

## OWASP Top 10 Compliance

### A01: Broken Access Control
- ✅ Admin endpoints require API key authentication
- ✅ No sensitive data exposure in client-side code

### A02: Cryptographic Failures
- ✅ API keys stored securely in environment variables
- ✅ No sensitive data in logs or error messages

### A03: Injection
- ✅ Input validation with Zod schemas
- ✅ Parameterized email templates
- ✅ HTML escaping in React components

### A04: Insecure Design
- ✅ Rate limiting prevents abuse
- ✅ Honeypot prevents automated attacks
- ✅ GDPR compliance built-in

### A05: Security Misconfiguration
- ✅ Environment validation script
- ✅ Secure defaults for all configurations
- ✅ No debug information in production

### A10: Server-Side Request Forgery (SSRF)
- ✅ No external HTTP requests from user input
- ✅ Validated email addresses only

## Security Testing

### Automated Security Validation
Run the security validation script:

```bash
npm run security:check
```

This checks:
- ✅ Required environment variables are set
- ✅ API key format validation
- ✅ Email format validation  
- ✅ Admin key strength

### Manual Security Tests

1. **Rate Limiting Test**
   ```bash
   # Test rate limiting (should fail after 5 requests)
   for i in {1..10}; do curl -X POST http://localhost:3000/api/waitlist -d '{}'; done
   ```

2. **Honeypot Test**
   ```bash
   # Test bot detection
   curl -X POST http://localhost:3000/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"honeypot":"bot_detected"}'
   ```

3. **Invalid Input Test**
   ```bash
   # Test input validation
   curl -X POST http://localhost:3000/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"invalid_email"}'
   ```

## Deployment Security Checklist

### Before Deployment
- [ ] All required secrets configured in GitHub repository
- [ ] Security validation passes (`npm run security:check`)
- [ ] No hardcoded credentials in code
- [ ] `.env.local` not committed to repository

### After Deployment
- [ ] Rate limiting working correctly
- [ ] Email functionality tested
- [ ] Admin endpoints require authentication
- [ ] Error messages don't leak sensitive information

## Incident Response

### API Key Compromise
If the Resend API key is compromised:

1. **Immediate Actions**
   - Revoke the compromised key in Resend dashboard
   - Generate new API key
   - Update GitHub repository secret

2. **Investigation**
   - Check Resend logs for unauthorized usage
   - Review application logs for suspicious activity
   - Rotate admin key as precaution

3. **Recovery**
   - Deploy with new credentials
   - Monitor for continued suspicious activity
   - Document incident for future prevention

## Security Contacts

- **Security Issues**: Open issue with `[SECURITY]` prefix
- **Responsible Disclosure**: Contact repository maintainers privately first
- **Emergency**: For critical security issues, contact immediately

## Additional Recommendations

### Production Enhancements
1. **Database Integration**: Replace in-memory rate limiting with Redis
2. **Monitoring**: Implement security event logging
3. **WAF**: Consider using a Web Application Firewall
4. **CSRF Protection**: Add CSRF tokens for form submissions
5. **Content Security Policy**: Implement strict CSP headers

### Regular Security Maintenance
- Monitor Resend API usage for anomalies
- Rotate API keys quarterly
- Review and update rate limits based on usage patterns
- Keep dependencies updated (use `npm audit`)

---

**Last Updated**: January 2025  
**Security Review**: Pending  
**Compliance**: OWASP Top 10 2021, GDPR