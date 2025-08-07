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

export interface PartnershipAnnouncementProps {
  firstName?: string;
  email?: string;
  partnerName?: string;
  partnerLogo?: string;
  partnerDescription?: string;
  benefits?: string[];
  ctaUrl?: string;
}

export const PartnershipAnnouncement = ({
  firstName = 'Aquascaper',
  email = 'user@example.com',
  partnerName = 'Green Aqua',
  partnerLogo = 'https://greenaqua.hu/static/img/logo.png',
  partnerDescription = 'Europe\'s premier aquascaping destination, known for their exceptional plant quality, innovative layouts, and world-class expertise.',
  benefits = [
    'Exclusive 15% discount on all Green Aqua products',
    'Priority access to limited edition plants and hardscape materials',
    'Free shipping on orders over €50 to Aquascene members',
    'Early access to Green Aqua\'s aquascaping workshops and masterclasses',
    'Monthly featured tank spotlights from Green Aqua\'s gallery',
  ],
  ctaUrl = 'https://aquascene.com/partners/green-aqua',
}: PartnershipAnnouncementProps) => {
  const previewText = `Exclusive partnership announcement: Aquascene × ${partnerName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://aquascene.com/logo-white.png"
              width="140"
              height="40"
              alt="Aquascene"
              style={logo}
            />
          </Section>

          {/* Partnership Hero */}
          <Section style={partnershipHero}>
            <Text style={partnershipLabel}>Partnership Announcement</Text>
            <Heading style={heroHeading}>
              Aquascene × {partnerName}
            </Heading>
            <Text style={heroSubtext}>
              We're thrilled to announce an exclusive partnership that will revolutionize your aquascaping journey!
            </Text>
          </Section>

          {/* Partner Logos */}
          <Section style={logosSection}>
            <div style={logosContainer}>
              <Img
                src="https://aquascene.com/logo-dark.png"
                width="120"
                height="35"
                alt="Aquascene"
                style={partnerLogoStyle}
              />
              <div style={plusSymbol}>×</div>
              <Img
                src={partnerLogo}
                width="120"
                height="35"
                alt={partnerName}
                style={partnerLogoStyle}
              />
            </div>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>
              Hello {firstName},
            </Text>
            
            <Text style={paragraph}>
              We have some incredible news to share with you! Aquascene has partnered with <strong>{partnerName}</strong>, one of the most respected names in the aquascaping world.
            </Text>

            {/* Partner Description */}
            <Section style={partnerSection}>
              <Heading style={partnerHeading}>
                About {partnerName}
              </Heading>
              <Text style={partnerText}>
                {partnerDescription}
              </Text>
              <div style={partnerStats}>
                <div style={statItem}>
                  <Text style={statNumber}>15+</Text>
                  <Text style={statLabel}>Years Experience</Text>
                </div>
                <div style={statItem}>
                  <Text style={statNumber}>500+</Text>
                  <Text style={statLabel}>Premium Plants</Text>
                </div>
                <div style={statItem}>
                  <Text style={statNumber}>50K+</Text>
                  <Text style={statLabel}>Happy Customers</Text>
                </div>
              </div>
            </Section>

            {/* Benefits Section */}
            <Section style={benefitsSection}>
              <Heading style={benefitsHeading}>
                Exclusive Member Benefits 🎁
              </Heading>
              <Text style={benefitsIntro}>
                As an Aquascene member, you'll enjoy these exclusive perks from our partnership:
              </Text>
              
              <div style={benefitsList}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={benefitItem}>
                    <span style={benefitIcon}>✨</span>
                    <Text style={benefitText}>{benefit}</Text>
                  </div>
                ))}
              </div>
            </Section>

            {/* Feature Showcase */}
            <Section style={showcaseSection}>
              <Heading style={showcaseHeading}>
                What This Means for You
              </Heading>
              
              <div style={showcaseGrid}>
                <div style={showcaseItem}>
                  <div style={showcaseIcon}>🌱</div>
                  <Heading style={showcaseItemTitle}>Premium Plants</Heading>
                  <Text style={showcaseItemText}>
                    Access to {partnerName}'s exclusive collection of rare and premium aquatic plants
                  </Text>
                </div>
                <div style={showcaseItem}>
                  <div style={showcaseIcon}>🎓</div>
                  <Heading style={showcaseItemTitle}>Expert Knowledge</Heading>
                  <Text style={showcaseItemText}>
                    Learn from {partnerName}'s world-renowned aquascaping experts and techniques
                  </Text>
                </div>
                <div style={showcaseItem}>
                  <div style={showcaseIcon}>🚀</div>
                  <Heading style={showcaseItemTitle}>Better Value</Heading>
                  <Text style={showcaseItemText}>
                    Enjoy exclusive discounts and member-only pricing on premium products
                  </Text>
                </div>
              </div>
            </Section>

            {/* Testimonial */}
            <Section style={testimonialSection}>
              <div style={testimonialCard}>
                <Text style={testimonialQuote}>
                  "This partnership represents our shared vision of making world-class aquascaping accessible to everyone. Together, we're creating something truly special for the aquascaping community."
                </Text>
                <div style={testimonialAuthor}>
                  <Img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                    width="40"
                    height="40"
                    alt="Balazs Farkas"
                    style={authorAvatar}
                  />
                  <div style={authorInfo}>
                    <Text style={authorName}>Balazs Farkas</Text>
                    <Text style={authorTitle}>Founder, {partnerName}</Text>
                  </div>
                </div>
              </div>
            </Section>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <div style={ctaCard}>
                <Heading style={ctaHeading}>
                  Ready to Explore the Partnership?
                </Heading>
                <Text style={ctaText}>
                  Discover all the exclusive benefits and start shopping with your member perks today!
                </Text>
                <Button style={primaryButton} href={ctaUrl}>
                  Explore Partnership Benefits
                </Button>
                <Text style={ctaSubtext}>
                  Benefits are automatically applied to your Aquascene account
                </Text>
              </div>
            </Section>

            {/* Timeline */}
            <Section style={timelineSection}>
              <Heading style={timelineHeading}>
                What's Coming Next?
              </Heading>
              <div style={timelineList}>
                <div style={timelineItem}>
                  <div style={timelineDot}></div>
                  <div style={timelineContent}>
                    <Text style={timelineDate}>This Week</Text>
                    <Text style={timelineTitle}>Partnership Launch</Text>
                    <Text style={timelineDescription}>All member benefits are now active</Text>
                  </div>
                </div>
                <div style={timelineItem}>
                  <div style={timelineDot}></div>
                  <div style={timelineContent}>
                    <Text style={timelineDate}>Next Month</Text>
                    <Text style={timelineTitle}>Exclusive Workshop Series</Text>
                    <Text style={timelineDescription}>Monthly masterclasses with {partnerName} experts</Text>
                  </div>
                </div>
                <div style={timelineItem}>
                  <div style={timelineDot}></div>
                  <div style={timelineContent}>
                    <Text style={timelineDate}>Q2 2024</Text>
                    <Text style={timelineTitle}>Collaborative Products</Text>
                    <Text style={timelineDescription}>Co-created aquascaping kits and exclusive items</Text>
                  </div>
                </div>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Aquascene</strong> - Partnering with the best in aquascaping
            </Text>
            <Text style={footerLinks}>
              <Link href="https://aquascene.com" style={link}>Website</Link> • 
              <Link href="https://aquascene.com/partners" style={link}>Partners</Link> • 
              <Link href="https://aquascene.com/blog" style={link}>Blog</Link> • 
              <Link href="https://instagram.com/aquascene" style={link}>Instagram</Link>
            </Text>
            <Text style={footerSmall}>
              You're receiving this partnership announcement because you're subscribed to Aquascene updates at {email}.
            </Text>
            <Text style={footerSmall}>
              <Link href="https://aquascene.com/unsubscribe" style={unsubscribeLink}>
                Unsubscribe
              </Link> • 
              <Link href="https://aquascene.com/preferences" style={unsubscribeLink}>
                Email Preferences
              </Link> • 
              <Link href="https://aquascene.com/privacy" style={unsubscribeLink}>
                Privacy Policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PartnershipAnnouncement;

// Styles
const main = {
  backgroundColor: '#f8fafc',
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
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const header = {
  background: 'linear-gradient(135deg, #2D5A3D 0%, #4A90A4 50%, #1A8B42 100%)',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const partnershipHero = {
  padding: '40px 24px 20px',
  textAlign: 'center' as const,
  background: 'linear-gradient(180deg, rgba(26, 139, 66, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
};

const partnershipLabel = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#1A8B42',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '0 0 12px 0',
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
  margin: '0',
};

const logosSection = {
  padding: '32px 24px',
  backgroundColor: '#f8fafc',
};

const logosContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
};

const partnerLogoStyle = {
  maxWidth: '120px',
  height: 'auto',
};

const plusSymbol = {
  fontSize: '24px',
  fontWeight: '300',
  color: '#94a3b8',
};

const content = {
  padding: '0 24px 24px',
};

const greeting = {
  fontSize: '16px',
  color: '#374151',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 24px 0',
};

const partnerSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0fdf4',
  borderRadius: '12px',
  border: '1px solid #bbf7d0',
};

const partnerHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const partnerText = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 20px 0',
};

const partnerStats = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
};

const statItem = {
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
  textTransform: 'uppercase' as const,
  fontWeight: '500',
};

const benefitsSection = {
  margin: '40px 0',
};

const benefitsHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const benefitsIntro = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#64748b',
  margin: '0 0 24px 0',
};

const benefitsList = {
  margin: '0',
};

const benefitItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 16px 0',
  padding: '16px',
  backgroundColor: '#fffef7',
  borderRadius: '8px',
  border: '1px solid #fef3c7',
};

const benefitIcon = {
  fontSize: '16px',
  marginRight: '12px',
  marginTop: '2px',
  flexShrink: 0,
};

const benefitText = {
  fontSize: '15px',
  lineHeight: '1.5',
  color: '#374151',
  margin: '0',
};

const showcaseSection = {
  margin: '40px 0',
};

const showcaseHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const showcaseGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '20px',
};

const showcaseItem = {
  textAlign: 'center' as const,
  padding: '20px',
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
};

const showcaseIcon = {
  fontSize: '32px',
  margin: '0 0 12px 0',
};

const showcaseItemTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 8px 0',
};

const showcaseItemText = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#6b7280',
  margin: '0',
};

const testimonialSection = {
  margin: '40px 0',
};

const testimonialCard = {
  padding: '24px',
  backgroundColor: '#1e293b',
  borderRadius: '12px',
  color: '#ffffff',
};

const testimonialQuote = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '0 0 20px 0',
  fontStyle: 'italic' as const,
};

const testimonialAuthor = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const authorAvatar = {
  borderRadius: '50%',
  border: '2px solid rgba(255, 255, 255, 0.2)',
};

const authorInfo = {
  flex: '1',
};

const authorName = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#ffffff',
  margin: '0 0 2px 0',
};

const authorTitle = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.7)',
  margin: '0',
};

const ctaSection = {
  margin: '40px 0',
};

const ctaCard = {
  padding: '32px 24px',
  background: 'linear-gradient(135deg, #4A90A4 0%, #2D5A3D 100%)',
  borderRadius: '12px',
  textAlign: 'center' as const,
  color: '#ffffff',
};

const ctaHeading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#ffffff',
  margin: '0 0 16px 0',
};

const ctaText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '0 0 24px 0',
};

const primaryButton = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#2D5A3D',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  margin: '0 0 16px 0',
  border: 'none',
  cursor: 'pointer',
};

const ctaSubtext = {
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.8)',
  margin: '0',
};

const timelineSection = {
  margin: '40px 0',
};

const timelineHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 24px 0',
};

const timelineList = {
  position: 'relative' as const,
};

const timelineItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 24px 0',
  paddingLeft: '20px',
};

const timelineDot = {
  width: '8px',
  height: '8px',
  backgroundColor: '#4A90A4',
  borderRadius: '50%',
  marginRight: '16px',
  marginTop: '6px',
  flexShrink: 0,
};

const timelineContent = {
  flex: '1',
};

const timelineDate = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#4A90A4',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px 0',
};

const timelineTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 4px 0',
};

const timelineDescription = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#6b7280',
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