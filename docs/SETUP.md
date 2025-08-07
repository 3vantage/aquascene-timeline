# Developer Setup Guide

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/3vantage/aquascene-waitlist.git
cd aquascene-waitlist
npm install
```

### 2. Environment Setup
```bash
# Copy example environment file
npm run security:env

# Edit .env.local with your actual values
nano .env.local
```

### 3. Get Resend API Key
1. Sign up at [Resend.com](https://resend.com)
2. Create new API key
3. Add your domain and verify DNS records
4. Copy API key to `.env.local`

### 4. Configure Environment Variables

Edit `.env.local`:
```bash
# Required - Get from Resend dashboard
RESEND_API_KEY=re_your_actual_api_key_here

# Required - Use your verified domain
RESEND_FROM_EMAIL=waitlist@yourdomain.com
RESEND_TO_EMAIL=admin@yourdomain.com

# Required - Generate secure admin key
ADMIN_KEY=your_secure_admin_key_minimum_16_chars

# Optional - Site configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional - Rate limiting
RATE_LIMIT_REQUESTS=5
RATE_LIMIT_WINDOW_MINUTES=60
```

### 5. Validate Security
```bash
npm run security:check
```

### 6. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## GitHub Pages Deployment

### Repository Secrets Setup

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**

2. Add these secrets:
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_FROM_EMAIL`: Your verified sender email
   - `RESEND_TO_EMAIL`: Admin notification email
   - `ADMIN_KEY`: Secure admin key (16+ characters)

3. Push to main branch to trigger deployment

## Vercel Deployment

### Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with environment variables
vercel --prod \
  -e RESEND_API_KEY=re_your_key \
  -e RESEND_FROM_EMAIL=waitlist@yourdomain.com \
  -e RESEND_TO_EMAIL=admin@yourdomain.com \
  -e ADMIN_KEY=your_admin_key
```

### Using Vercel Dashboard
1. Import project from GitHub
2. Add environment variables in project settings
3. Deploy

## Testing the Setup

### 1. Test Email Functionality
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "experience": "beginner",
    "interests": ["3d_design"],
    "gdprConsent": true,
    "honeypot": ""
  }'
```

Should return:
```json
{
  "success": true,
  "position": 123,
  "message": "Successfully joined the waitlist"
}
```

### 2. Test Admin Endpoint
```bash
curl "http://localhost:3000/api/waitlist?key=your_admin_key"
```

Should return waitlist statistics.

### 3. Test Rate Limiting
Make 6+ requests quickly - should get 429 status after the 5th request.

## Troubleshooting

### Common Issues

**"RESEND_API_KEY is not configured"**
- Check `.env.local` file exists and has correct variable name
- Restart development server after adding environment variables

**"Invalid email format"**
- Ensure `RESEND_FROM_EMAIL` uses a verified domain in Resend
- Check domain DNS records are properly configured

**Emails not sending**
- Verify Resend API key is valid and not expired
- Check Resend dashboard for sending limits and domain status
- Look for errors in browser console or terminal

**Rate limiting not working**
- Rate limiting uses in-memory storage in development
- Each server restart resets the rate limit counters

### Debug Mode
Add to `.env.local`:
```bash
NODE_ENV=development
DEBUG=true
```

### Logs Location
- **Development**: Terminal output
- **Production**: Check platform logs (Vercel, etc.)

## Security Best Practices

### During Development
- ✅ Never commit `.env.local` to git
- ✅ Use different API keys for dev/staging/production
- ✅ Run `npm run security:check` before commits
- ✅ Keep dependencies updated with `npm audit`

### Before Production
- ✅ All secrets configured in deployment platform
- ✅ Security validation passes
- ✅ Rate limiting tested and appropriate
- ✅ Email templates tested with real data

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Validate security configuration
npm run security:check

# Setup environment file
npm run security:env

# Type checking
npx tsc --noEmit
```

## File Structure

```
aquascene-waitlist/
├── .env.example          # Template for environment variables
├── .env.local           # Your local environment (do not commit)
├── .gitignore           # Excludes .env* files
├── src/
│   ├── app/api/waitlist/ # API endpoint with security features
│   ├── lib/resend.ts    # Centralized email configuration
│   └── components/      # React components
├── scripts/
│   └── validate-security.js # Security validation script
└── docs/
    ├── SECURITY.md      # Security documentation
    └── SETUP.md         # This file
```

## Next Steps

After setup is complete:
1. Test the waitlist form on your local development server
2. Verify emails are being sent correctly
3. Test admin functionality with your admin key
4. Deploy to your chosen platform
5. Monitor for any security issues or rate limiting needs

For production deployment, see [SECURITY.md](./SECURITY.md) for additional security considerations.