# Aquascene Waitlist - Project Context

## Overview
This is the waitlist and education platform for Aquascene, a Bulgarian aquascaping startup aiming to partner with Green Aqua Hungary. The application serves as the initial customer acquisition tool and partnership demonstration platform.

## Key Features
- **Multi-language Support**: English, Bulgarian (Cyrillic), Hungarian
- **Email Integration**: Configured with Resend API to send emails to gerasimovkris@3vantage.com
- **Animated Design**: Underwater theme with bubble animations and aquarium visuals
- **Static Deployment**: Deployed via GitHub Pages at https://3vantage.github.io/aquascene-waitlist
- **GDPR Compliant**: Proper consent management for EU markets

## Technical Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with aquascaping color palette
- **Animations**: Framer Motion for micro-interactions
- **Email**: Resend API (configured via environment variables)
- **Forms**: React Hook Form with Zod validation
- **Deployment**: GitHub Pages via GitHub Actions

## Environment Variables
```bash
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=waitlist@aquascene.com
RESEND_TO_EMAIL=gerasimovkris@3vantage.com
NEXT_PUBLIC_SITE_URL=https://3vantage.github.io/aquascene-waitlist
```

**Security Note**: Never commit real API keys to version control. Use environment variables and repository secrets for production deployments.

## Project Structure
```
src/
├── app/
│   ├── [locale]/         # Internationalized pages
│   ├── api/
│   │   └── waitlist/     # Email API endpoint
│   └── globals.css       # Global styles
├── components/
│   ├── animations/       # Bubble system and effects
│   ├── forms/           # Waitlist form components
│   └── sections/        # Page sections
├── i18n/                # Internationalization config
└── lib/                 # Utilities and validations
```

## Development Commands
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint
npm run type-check      # TypeScript checking
```

## Deployment
The site is automatically deployed to GitHub Pages when pushing to main branch. The workflow:
1. Builds the Next.js static site
2. Exports to `out/` directory
3. Deploys to GitHub Pages

## API Endpoints
- **POST /api/waitlist**: Submit waitlist form
  - Sends welcome email to subscriber
  - Sends notification to gerasimovkris@3vantage.com
  - Rate limited to 5 requests per hour per IP

- **GET /api/waitlist?key=ADMIN_KEY**: Get waitlist statistics
  - Returns total entries, recent signups, experience breakdown

## Business Context
- **Target Market**: Bulgarian aquascaping enthusiasts
- **Partnership Goal**: Secure exclusive partnership with Green Aqua Hungary
- **Revenue Model**: Services (65%), Maintenance (25%), Products (10%)
- **Projected Growth**: €85K (Y1) → €155K (Y2) → €260K (Y3)

## Related Repositories
- **aquascene**: Main platform with 15 themes including Timeline
- **3vantage-docs**: Comprehensive documentation and business plans

## Testing Checklist
- [ ] Multi-language switching works correctly
- [ ] Form submission sends emails
- [ ] Animations perform well on mobile
- [ ] GDPR consent properly collected
- [ ] Rate limiting prevents spam
- [ ] Analytics tracking functional

## Contact
- **Owner Email**: gerasimovkris@3vantage.com
- **Organization**: 3vantage
- **Location**: Bulgaria (targeting Sofia, Plovdiv, Varna)