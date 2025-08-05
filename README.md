# 3vantage Aquascaping Waitlist SPA

A stunning, animated waitlist landing page for the 3vantage aquascaping platform, built with Next.js 14, featuring underwater effects, multi-language support, and seamless email integration.

## 🌊 Features

### Core Functionality
- **Animated Waitlist Form** with real-time validation
- **Multi-language Support** (English, Bulgarian, Hungarian)
- **Email Integration** with Resend API
- **GDPR Compliance** with proper consent management
- **Mobile-First Responsive Design**
- **SEO Optimized** with structured data

### Visual Design
- **Aquascaping Theme** with underwater effects
- **Glassmorphism UI Components** 
- **Framer Motion Animations** throughout
- **Animated Bubble System** 
- **Fish Swimming Patterns**
- **Light Refraction Effects**
- **Water Ripple Interactions**

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom aquascaping color palette
- **React Hook Form** with Zod validation
- **next-intl** for internationalization
- **Performance Optimized** with accessibility support
- **Reduced Motion Support** for accessibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Resend API key (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aquascene-waitlist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ADMIN_KEY=your_secure_admin_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000/en` to see the application.

## 📧 Email Configuration

### Resend Setup
1. Sign up at [Resend](https://resend.com)
2. Create an API key
3. Add your API key to `.env.local`
4. Verify your domain for production use

### Email Templates
The application includes beautiful HTML email templates:
- **Welcome Email** for new subscribers
- **Owner Notification** sent to `gerasimovkris@3vantage.com`

## 🌍 Multi-language Support

The application supports three languages:

### Available Locales
- **English** (`/en`) - Primary language
- **Bulgarian** (`/bg`) - Cyrillic support
- **Hungarian** (`/hu`) - Hungarian localization

### Adding New Languages
1. Create a new message file in `messages/[locale].json`
2. Add the locale to `src/i18n.ts`
3. Update the middleware configuration
4. Add translation entries for all text content

### Translation Structure
```
messages/
├── en.json     # English translations
├── bg.json     # Bulgarian translations (Cyrillic)
└── hu.json     # Hungarian translations
```

## 🎨 Customization

### Color Scheme
The aquascaping color palette is defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#2D5A3D', // Deep Forest Green
    light: '#4A7C59',   // Sage Green
    dark: '#1A3A2E',    // Dark Forest
  },
  secondary: {
    DEFAULT: '#4A90A4', // Clear Water Blue
    light: '#87CEEB',   // Light Aqua
    dark: '#1E3A5F',    // Ocean Depth
  },
  accent: {
    DEFAULT: '#6B9B7C', // Soft Eucalyptus
    light: '#A8C9B0',   // Mint Whisper
    coral: '#FF6B6B',   // Living Coral
    emerald: '#1A8B42', // Vibrant Emerald
  }
}
```

### Animation Configuration
Animations are managed through `src/lib/animation-config.ts`:

- **Performance-based adaptation** for low-end devices
- **Reduced motion support** for accessibility
- **Customizable animation variants** for different UI elements

### Component Architecture
```
src/
├── components/
│   ├── animations/     # Animation components (bubbles, effects)
│   ├── forms/         # Form components with validation
│   ├── sections/      # Page sections (hero, features, etc.)
│   └── ui/           # Base UI components (buttons, inputs)
├── lib/              # Utilities and configurations
├── app/              # Next.js App Router structure
└── messages/         # Translation files
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

### Test Coverage
- Form validation testing
- Animation performance testing
- Multi-language content testing
- API endpoint testing

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard:
   ```
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ADMIN_KEY=your_secure_admin_key
   ```
3. **Deploy automatically** on git push

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Analytics & Monitoring

### Built-in Features
- **Performance monitoring** with animation frame rate tracking
- **Form submission analytics** 
- **Error tracking** with detailed logging
- **User experience metrics**

### Integration Options
- Google Analytics 4
- PostHog for product analytics
- Sentry for error monitoring

## 🔒 Security Features

### Data Protection
- **GDPR compliant** consent management
- **Rate limiting** on API endpoints
- **Input validation** with Zod schemas
- **Spam protection** with honeypot fields
- **XSS protection** headers

### Privacy Compliance
- Cookie consent handling
- Data portability features
- Right to be forgotten implementation
- Transparent privacy policy

## 🌐 SEO Optimization

### Technical SEO
- **Structured data** with JSON-LD
- **Multi-language hreflang** tags
- **Optimized meta tags** per locale
- **Semantic HTML** structure
- **Performance optimized** (Core Web Vitals)

### Content SEO
- **Localized content** for each market
- **Proper heading hierarchy**
- **Alt text for images**
- **Schema markup** for organization data

## 🎯 Performance Optimization

### Loading Performance
- **Static generation** with ISR
- **Image optimization** with Next.js
- **Font optimization** with Google Fonts
- **Bundle splitting** by route
- **Gzip compression** enabled

### Runtime Performance
- **Animation performance monitoring**
- **Lazy loading** for non-critical components
- **Memory leak prevention**
- **Efficient re-rendering** with React patterns

## 🛠️ Development Workflow

### Code Quality
- **TypeScript** for type safety
- **ESLint** with Next.js configuration
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

### Development Tools
- **Hot reloading** with Turbopack
- **VS Code extensions** recommended
- **Chrome DevTools** performance profiling
- **Lighthouse** auditing

## 📝 API Documentation

### Waitlist Endpoint
```typescript
POST /api/waitlist
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "experience": "intermediate",
  "interests": ["3d_design", "calculations"],
  "gdprConsent": true,
  "marketingConsent": false
}
```

**Response:**
```json
{
  "message": "Successfully joined the waitlist!",
  "position": 1234,
  "totalSubscribers": 2500
}
```

### Admin Stats Endpoint
```typescript
GET /api/waitlist?key=admin_key
```

Returns waitlist statistics and recent entries.

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Install dependencies
4. Make your changes
5. Run tests
6. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use semantic commit messages
- Maintain test coverage
- Document new features

## 📄 License

This project is proprietary software created for 3vantage. All rights reserved.

## 🆘 Support

### Documentation
- Check this README for common setup issues
- Review the component documentation in `src/components/`
- Check translation files for content updates

### Contact
- **Email**: gerasimovkris@3vantage.com
- **Issues**: Use GitHub issues for bug reports
- **Features**: Submit feature requests via GitHub

## 🎉 Acknowledgments

- **Green Aqua** - Partnership and inspiration
- **Aquascaping Community** - Design feedback
- **Open Source Libraries** - Built on amazing open source tools

---

**Built with ❤️ for the aquascaping community by 3vantage**

*Ready to transform the aquascaping world, one tank at a time.*