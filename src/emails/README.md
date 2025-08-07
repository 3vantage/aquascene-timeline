# Aquascene Email Templates

Professional email templates built with React Email components, featuring aquascaping themes with underwater colors, mobile responsiveness, and conversion optimization.

## Templates Overview

### 1. Welcome Email (`welcome-email.tsx`)
**Purpose**: Sent to new waitlist signups to welcome them and provide initial value.

**Features**:
- Personalized greeting with user's name
- Waitlist benefits overview
- Referral code for sharing
- Aquascaping tips CTA
- Clean underwater gradient design

**Props**:
```typescript
interface WelcomeEmailProps {
  firstName?: string;
  email?: string;
  referralCode?: string;
}
```

### 2. Weekly Digest (`weekly-digest.tsx`)
**Purpose**: Weekly newsletter featuring blog highlights, community content, and tips.

**Features**:
- Featured blog articles with thumbnails
- Tip of the week section
- Community highlights
- Quick navigation links
- Responsive grid layout

**Props**:
```typescript
interface WeeklyDigestProps {
  firstName?: string;
  email?: string;
  weekNumber?: number;
  featuredPosts?: BlogPost[];
  tipOfTheWeek?: TipOfWeek;
  communityHighlight?: CommunityHighlight;
}
```

### 3. Partnership Announcement (`partnership-announcement.tsx`)
**Purpose**: Announces new partnerships (e.g., Green Aqua) with exclusive member benefits.

**Features**:
- Dual logo presentation
- Partner statistics and credentials
- Exclusive member benefits list
- Timeline of upcoming features
- Testimonial from partner

**Props**:
```typescript
interface PartnershipAnnouncementProps {
  firstName?: string;
  email?: string;
  partnerName?: string;
  partnerLogo?: string;
  partnerDescription?: string;
  benefits?: string[];
  ctaUrl?: string;
}
```

### 4. Launch Notification (`launch-notification.tsx`)
**Purpose**: Announces platform launch with early access for waitlist members.

**Features**:
- Celebration design with emojis
- Early access code prominent display
- Platform features showcase
- Exclusive launch offers
- Success stories from early users
- Step-by-step getting started guide

**Props**:
```typescript
interface LaunchNotificationProps {
  firstName?: string;
  email?: string;
  waitlistPosition?: number;
  earlyAccessCode?: string;
  launchDate?: string;
  specialOffers?: SpecialOffer[];
}
```

### 5. Referral Invitation (`referral-invitation.tsx`)
**Purpose**: Dual-purpose template for both sending invitations and promoting referral program.

**Features**:
- Dynamic content based on invitation vs. referral context
- Referral progress tracking
- Reward levels with status indicators
- Social sharing buttons
- Step-by-step referral instructions

**Props**:
```typescript
interface ReferralInvitationProps {
  firstName?: string;
  email?: string;
  referralCode?: string;
  referralCount?: number;
  nextRewardThreshold?: number;
  rewards?: Reward[];
  friendFirstName?: string; // When present, switches to invitation mode
}
```

## Design System

### Color Palette
All templates use Aquascene's aquascaping color palette:
- **Primary**: `#2D5A3D` (Deep forest green)
- **Secondary**: `#4A90A4` (Aqua blue)
- **Accent**: `#6B9B7C` (Sage green)
- **Success**: `#1A8B42` (Emerald green)
- **Coral**: `#FF6B6B` (Coral accent)

### Typography
- **Primary Font**: Inter (modern, clean sans-serif)
- **Headings**: Bold weights (600-800) for impact
- **Body Text**: Regular weight (400) for readability
- **Code/Referral**: Monospace for codes

### Layout Principles
- **Mobile-first**: All templates are responsive
- **Container Width**: Max 640px for optimal email client support
- **Padding**: Consistent 24px horizontal padding
- **Sections**: Clear visual separation with proper spacing
- **Buttons**: High contrast, prominent CTAs

## Usage

### Basic Import
```typescript
import { WelcomeEmail } from '@/emails';

// Render with React Email
const emailHtml = render(WelcomeEmail({
  firstName: 'John',
  email: 'john@example.com',
  referralCode: 'AQUA2024'
}));
```

### With Resend
```typescript
import { resend } from '@/lib/resend';
import { WelcomeEmail } from '@/emails';

await resend.emails.send({
  from: 'Aquascene <hello@aquascene.com>',
  to: [email],
  subject: 'Welcome to Aquascene! 🌿',
  react: WelcomeEmail({ firstName, email, referralCode }),
});
```

## Compliance Features

### GDPR Compliance
- Clear unsubscribe links in all emails
- Privacy policy links
- GDPR rights information
- Data usage transparency

### Accessibility
- Semantic HTML structure
- Alt text for all images
- High contrast ratios
- Screen reader friendly

### Email Client Support
- Tested across major email clients
- Fallback fonts specified
- Progressive enhancement
- Table-based layouts where needed

## Customization

### Brand Colors
Update the color variables in each template's styles section to match your brand.

### Content
All templates accept props for dynamic content. Default values are provided for development/testing.

### Images
Replace placeholder image URLs with your actual assets:
- Logo: Update logo URLs in header sections
- Featured images: Provide actual blog post images
- Profile photos: Use real user avatars

### Links
Update all href attributes to point to your actual domain and pages.

## Best Practices

### Subject Lines
- Keep under 50 characters
- Include emojis sparingly for personality
- A/B test different variations
- Avoid spam trigger words

### Content
- Personalize with user's name
- Keep paragraphs short and scannable
- Use bullet points for lists
- Include clear value propositions

### CTAs
- Use action-oriented language
- Make buttons prominent and clickable
- Limit to 1-2 primary CTAs per email
- Test different button colors and text

### Testing
- Preview in multiple email clients
- Test on mobile devices
- Check all links work correctly
- Validate HTML with email testing tools

## Performance

### Image Optimization
- Use WebP with fallbacks
- Compress images appropriately
- Provide proper alt text
- Consider lazy loading for long emails

### Load Times
- Minimize inline CSS where possible
- Use system fonts as fallbacks
- Optimize image sizes
- Keep HTML structure clean

## Analytics

### Tracking
- UTM parameters in all links
- Track open rates with tracking pixels
- Monitor click-through rates
- A/B test subject lines and content

### Metrics to Monitor
- Open rates by template type
- Click-through rates on CTAs
- Unsubscribe rates
- Conversion rates to desired actions