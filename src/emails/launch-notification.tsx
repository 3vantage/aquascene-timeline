import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

export interface LaunchNotificationProps {
  firstName?: string;
  email?: string;
  waitlistPosition?: number;
  earlyAccessCode?: string;
  launchDate?: string;
  specialOffers?: {
    title: string;
    description: string;
    discount: string;
    validUntil: string;
  }[];
}

export const LaunchNotification = ({
  firstName = 'Aquascaper',
  email = 'user@example.com',
  waitlistPosition = 1337,
  earlyAccessCode = 'LAUNCH2024',
  launchDate = 'March 15, 2024',
  specialOffers = [
    {
      title: 'Premium Membership',
      description: 'Get 50% off your first year of Aquascene Premium',
      discount: '50% OFF',
      validUntil: 'March 31, 2024',
    },
    {
      title: 'Starter Kit Bundle',
      description: 'Complete aquascaping starter kit with exclusive tools',
      discount: '30% OFF',
      validUntil: 'April 15, 2024',
    },
  ],
}: LaunchNotificationProps) => {
  const previewText = `🚀 Aquascene is live! Your early access is ready.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with animated gradient */}
          <Section style={header}>
            <Img
              src="https://aquascene.com/logo-white.png"
              width="140"
              height="40"
              alt="Aquascene"
              style={logo}
            />
            <div style={launchBadge}>
              🚀 NOW LIVE
            </div>
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <div style={celebrationEmojis}>🎉 🌊 🎉</div>
            <Heading style={heroHeading}>
              Welcome to the Future of Aquascaping!
            </Heading>
            <Text style={heroSubtext}>
              After months of anticipation, Aquascene is officially live and you have exclusive early access!
            </Text>
            <div style={positionBadge}>
              You were #{waitlistPosition.toLocaleString()} on our waitlist
            </div>
          </Section>

          {/* Quick Stats */}
          <Section style={statsSection}>
            <div style={statsGrid}>
              <div style={statCard}>
                <Text style={statNumber}>50K+</Text>
                <Text style={statLabel}>Plants & Materials</Text>
              </div>
              <div style={statCard}>
                <Text style={statNumber}>100+</Text>
                <Text style={statLabel}>Expert Tutorials</Text>
              </div>
              <div style={statCard}>
                <Text style={statNumber}>24/7</Text>
                <Text style={statLabel}>Community Support</Text>
              </div>
            </div>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>
              Hello {firstName},
            </Text>
            
            <Text style={paragraph}>
              The wait is over! We're incredibly excited to welcome you to Aquascene – the platform that will transform how you create, learn, and share aquascaping masterpieces.
            </Text>

            {/* Early Access Section */}
            <Section style={accessSection}>
              <Heading style={accessHeading}>
                🎯 Your Early Access is Ready
              </Heading>
              <Text style={accessText}>
                As one of our valued waitlist members, you get immediate access to all platform features, plus exclusive launch bonuses!
              </Text>
              <div style={accessCodeBox}>
                <Text style={accessCodeLabel}>Your Early Access Code</Text>
                <Text style={accessCode}>{earlyAccessCode}</Text>
                <Text style={accessCodeNote}>
                  Use this code to unlock all premium features for free during your first month
                </Text>
              </div>
              <Button style={launchButton} href={`https://aquascene.com/launch?code=${earlyAccessCode}`}>
                Start Your Aquascaping Journey
              </Button>
            </Section>

            {/* What's New */}
            <Section style={featuresSection}>
              <Heading style={featuresHeading}>
                🌟 What's Available Right Now
              </Heading>
              
              <div style={featuresList}>
                <div style={featureItem}>
                  <div style={featureIcon}>🎨</div>
                  <div style={featureContent}>
                    <Heading style={featureTitle}>Design Studio</Heading>
                    <Text style={featureDescription}>
                      Plan your aquascapes with our advanced 3D visualization tools
                    </Text>
                  </div>
                </div>
                <div style={featureItem}>
                  <div style={featureIcon}>📚</div>
                  <div style={featureContent}>
                    <Heading style={featureTitle}>Master Classes</Heading>
                    <Text style={featureDescription}>
                      Learn from world-renowned aquascaping experts with step-by-step tutorials
                    </Text>
                  </div>
                </div>
                <div style={featureItem}>
                  <div style={featureIcon}>🛒</div>
                  <div style={featureContent}>
                    <Heading style={featureTitle}>Premium Marketplace</Heading>
                    <Text style={featureDescription}>
                      Access rare plants, premium hardscape, and exclusive aquascaping tools
                    </Text>
                  </div>
                </div>
                <div style={featureItem}>
                  <div style={featureIcon}>👥</div>
                  <div style={featureContent}>
                    <Heading style={featureTitle}>Global Community</Heading>
                    <Text style={featureDescription}>
                      Connect with aquascapers worldwide, share your creations, and get feedback
                    </Text>
                  </div>
                </div>
                <div style={featureItem}>
                  <div style={featureIcon}>📱</div>
                  <div style={featureContent}>
                    <Heading style={featureTitle}>Mobile App</Heading>
                    <Text style={featureDescription}>
                      Take Aquascene with you - available on iOS and Android
                    </Text>
                  </div>
                </div>
              </div>
            </Section>

            {/* Exclusive Offers */}
            <Section style={offersSection}>
              <Heading style={offersHeading}>
                🎁 Exclusive Launch Offers
              </Heading>
              <Text style={offersSubtext}>
                Limited-time deals available only to our early access members
              </Text>
              
              <div style={offersList}>
                {specialOffers.map((offer, index) => (
                  <div key={index} style={offerCard}>
                    <div style={offerHeader}>
                      <Text style={offerTitle}>{offer.title}</Text>
                      <div style={discountBadge}>{offer.discount}</div>
                    </div>
                    <Text style={offerDescription}>{offer.description}</Text>
                    <Text style={offerValidity}>Valid until {offer.validUntil}</Text>
                    <Button style={offerButton} href="https://aquascene.com/offers">
                      Claim Offer
                    </Button>
                  </div>
                ))}
              </div>
            </Section>

            {/* Success Stories Preview */}
            <Section style={testimonialSection}>
              <Heading style={testimonialHeading}>
                Early Members Are Already Creating Magic ✨
              </Heading>
              
              <div style={testimonialGrid}>
                <div style={testimonialCard}>
                  <Img
                    src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop"
                    width="120"
                    height="80"
                    alt="Sarah's aquascape"
                    style={testimonialImage}
                  />
                  <Text style={testimonialText}>
                    "In just 2 days, I designed my dream iwagumi tank using the 3D studio!"
                  </Text>
                  <Text style={testimonialAuthor}>— Sarah K., Netherlands</Text>
                </div>
                <div style={testimonialCard}>
                  <Img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
                    width="120"
                    height="80"
                    alt="Mike's aquascape"
                    style={testimonialImage}
                  />
                  <Text style={testimonialText}>
                    "The expert tutorials helped me create a contest-winning layout!"
                  </Text>
                  <Text style={testimonialAuthor}>— Mike R., USA</Text>
                </div>
              </div>
            </Section>

            {/* Getting Started */}
            <Section style={gettingStartedSection}>
              <Heading style={gettingStartedHeading}>
                Ready to Dive In? Here's How to Start:
              </Heading>
              
              <div style={stepsList}>
                <div style={stepItem}>
                  <div style={stepNumber}>1</div>
                  <div style={stepContent}>
                    <Text style={stepTitle}>Create Your Account</Text>
                    <Text style={stepDescription}>Use your early access code for premium features</Text>
                  </div>
                </div>
                <div style={stepItem}>
                  <div style={stepNumber}>2</div>
                  <div style={stepContent}>
                    <Text style={stepTitle}>Explore the Platform</Text>
                    <Text style={stepDescription}>Take the guided tour to discover all features</Text>
                  </div>
                </div>
                <div style={stepItem}>
                  <div style={stepNumber}>3</div>
                  <div style={stepContent}>
                    <Text style={stepTitle}>Start Your First Project</Text>
                    <Text style={stepDescription}>Use our design studio or browse the marketplace</Text>
                  </div>
                </div>
              </div>
            </Section>

            {/* Final CTA */}
            <Section style={finalCtaSection}>
              <div style={finalCtaCard}>
                <Heading style={finalCtaHeading}>
                  Your Aquascaping Adventure Starts Now! 🌊
                </Heading>
                <Text style={finalCtaText}>
                  Join thousands of aquascapers who are already creating their underwater masterpieces on Aquascene.
                </Text>
                <Button style={primaryButton} href={`https://aquascene.com/get-started?code=${earlyAccessCode}`}>
                  Launch Aquascene Now
                </Button>
                <Text style={finalCtaSubtext}>
                  Questions? Our support team is standing by 24/7 to help you get started.
                </Text>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Aquascene</strong> - Where underwater dreams become reality
            </Text>
            <Text style={footerLinks}>
              <Link href="https://aquascene.com" style={link}>Platform</Link> • 
              <Link href="https://aquascene.com/app" style={link}>Mobile App</Link> • 
              <Link href="https://aquascene.com/support" style={link}>Support</Link> • 
              <Link href="https://instagram.com/aquascene" style={link}>Instagram</Link>
            </Text>
            <Text style={footerSmall}>
              You're receiving this launch notification because you joined our waitlist at {email}.
            </Text>
            <Text style={footerSmall}>
              <Link href="https://aquascene.com/unsubscribe" style={unsubscribeLink}>
                Unsubscribe
              </Link> • 
              <Link href="https://aquascene.com/privacy" style={unsubscribeLink}>
                Privacy Policy
              </Link> • 
              <Link href="https://aquascene.com/terms" style={unsubscribeLink}>
                Terms of Service
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LaunchNotification;

// Styles
const main = {
  backgroundColor: '#f1f5f9',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginTop: '20px',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '640px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const header = {
  background: 'linear-gradient(135deg, #1A8B42 0%, #2D5A3D 30%, #4A90A4 70%, #6B9B7C 100%)',
  padding: '32px 24px',
  textAlign: 'center' as const,
  position: 'relative' as const,
};

const logo = {
  margin: '0 auto 16px auto',
};

const launchBadge = {
  display: 'inline-block',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '700',
  padding: '6px 12px',
  borderRadius: '20px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

const heroSection = {
  padding: '40px 24px',
  textAlign: 'center' as const,
  background: 'linear-gradient(180deg, rgba(26, 139, 66, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
};

const celebrationEmojis = {
  fontSize: '32px',
  margin: '0 0 20px 0',
};

const heroHeading = {
  fontSize: '32px',
  lineHeight: '1.2',
  fontWeight: '800',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const heroSubtext = {
  fontSize: '18px',
  lineHeight: '1.6',
  color: '#64748b',
  margin: '0 0 20px 0',
};

const positionBadge = {
  display: 'inline-block',
  backgroundColor: '#f0f9ff',
  color: '#4A90A4',
  fontSize: '14px',
  fontWeight: '600',
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid #bae6fd',
};

const statsSection = {
  padding: '20px 24px',
  backgroundColor: '#fafafa',
};

const statsGrid = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
};

const statCard = {
  textAlign: 'center' as const,
  flex: '1',
};

const statNumber = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1A8B42',
  margin: '0 0 4px 0',
};

const statLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0',
  fontWeight: '500',
};

const content = {
  padding: '0 24px 24px',
};

const greeting = {
  fontSize: '16px',
  color: '#374151',
  margin: '20px 0 16px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 24px 0',
};

const accessSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0fdf4',
  borderRadius: '12px',
  border: '2px solid #1A8B42',
  textAlign: 'center' as const,
};

const accessHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const accessText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 24px 0',
};

const accessCodeBox = {
  margin: '24px 0',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '2px dashed #1A8B42',
};

const accessCodeLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  fontWeight: '500',
  letterSpacing: '0.05em',
};

const accessCode = {
  fontSize: '24px',
  fontWeight: '800',
  color: '#1A8B42',
  margin: '0 0 8px 0',
  fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const accessCodeNote = {
  fontSize: '13px',
  color: '#64748b',
  margin: '0',
  lineHeight: '1.4',
};

const launchButton = {
  backgroundColor: '#1A8B42',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '16px 0 0 0',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 6px -1px rgba(26, 139, 66, 0.2)',
};

const featuresSection = {
  margin: '40px 0',
};

const featuresHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const featuresList = {
  margin: '0',
};

const featureItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 20px 0',
  padding: '16px',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};

const featureIcon = {
  fontSize: '24px',
  marginRight: '16px',
  marginTop: '4px',
  flexShrink: 0,
};

const featureContent = {
  flex: '1',
};

const featureTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 6px 0',
};

const featureDescription = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#6b7280',
  margin: '0',
};

const offersSection = {
  margin: '40px 0',
};

const offersHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
};

const offersSubtext = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const offersList = {
  display: 'grid',
  gap: '16px',
};

const offerCard = {
  padding: '20px',
  backgroundColor: '#fffbeb',
  borderRadius: '12px',
  border: '1px solid #fbbf24',
};

const offerHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  margin: '0 0 12px 0',
};

const offerTitle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0',
};

const discountBadge = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '700',
  padding: '4px 8px',
  borderRadius: '4px',
  textTransform: 'uppercase' as const,
};

const offerDescription = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#374151',
  margin: '0 0 8px 0',
};

const offerValidity = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 16px 0',
  fontStyle: 'italic' as const,
};

const offerButton = {
  backgroundColor: '#f59e0b',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
};

const testimonialSection = {
  margin: '40px 0',
};

const testimonialHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const testimonialGrid = {
  display: 'grid',
  gap: '16px',
};

const testimonialCard = {
  padding: '16px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  textAlign: 'center' as const,
};

const testimonialImage = {
  borderRadius: '6px',
  margin: '0 auto 12px auto',
  objectFit: 'cover' as const,
};

const testimonialText = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#374151',
  margin: '0 0 8px 0',
  fontStyle: 'italic' as const,
};

const testimonialAuthor = {
  fontSize: '12px',
  color: '#6b7280',
  fontWeight: '500',
  margin: '0',
};

const gettingStartedSection = {
  margin: '40px 0',
};

const gettingStartedHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 24px 0',
};

const stepsList = {
  margin: '0',
};

const stepItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 20px 0',
};

const stepNumber = {
  width: '32px',
  height: '32px',
  backgroundColor: '#4A90A4',
  color: '#ffffff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '700',
  marginRight: '16px',
  flexShrink: 0,
};

const stepContent = {
  flex: '1',
  paddingTop: '4px',
};

const stepTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 4px 0',
};

const stepDescription = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#6b7280',
  margin: '0',
};

const finalCtaSection = {
  margin: '40px 0',
};

const finalCtaCard = {
  padding: '32px 24px',
  background: 'linear-gradient(135deg, #2D5A3D 0%, #1A8B42 100%)',
  borderRadius: '12px',
  textAlign: 'center' as const,
  color: '#ffffff',
};

const finalCtaHeading = {
  fontSize: '26px',
  fontWeight: '700',
  color: '#ffffff',
  margin: '0 0 16px 0',
};

const finalCtaText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '0 0 24px 0',
};

const primaryButton = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#2D5A3D',
  fontSize: '18px',
  fontWeight: '700',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '0 0 16px 0',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const finalCtaSubtext = {
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.8)',
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  padding: '0 24px 32px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 12px 0',
};

const footerLinks = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 16px 0',
};

const footerSmall = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '0 0 8px 0',
  lineHeight: '1.5',
};

const link = {
  color: '#4A90A4',
  textDecoration: 'none',
  fontWeight: '500',
  margin: '0 4px',
};

const unsubscribeLink = {
  color: '#9ca3af',
  textDecoration: 'none',
  margin: '0 4px',
};