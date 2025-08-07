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

export interface WelcomeEmailProps {
  firstName?: string;
  email?: string;
  referralCode?: string;
}

export const WelcomeEmail = ({
  firstName = 'Aquascaper',
  email = 'user@example.com',
  referralCode = 'AQUA123',
}: WelcomeEmailProps) => {
  const previewText = `Welcome to Aquascene - Your aquascaping journey begins here!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with underwater gradient */}
          <Section style={header}>
            <Img
              src="https://aquascene.com/logo-white.png"
              width="140"
              height="40"
              alt="Aquascene"
              style={logo}
            />
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={heroHeading}>
              Welcome to Aquascene, {firstName}! 🌿
            </Heading>
            <Text style={heroSubtext}>
              Your underwater world awaits. Thank you for joining our exclusive waitlist!
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>
              We're thrilled to have you as part of the Aquascene community. You've taken the first step into the mesmerizing world of aquascaping, where nature meets artistry beneath the surface.
            </Text>

            <Text style={paragraph}>
              <strong>What happens next?</strong>
            </Text>

            <div style={benefitsList}>
              <div style={benefitItem}>
                <span style={benefitIcon}>🎯</span>
                <Text style={benefitText}>
                  <strong>Priority Access:</strong> You'll be among the first to experience our platform when we launch
                </Text>
              </div>
              <div style={benefitItem}>
                <span style={benefitIcon}>📚</span>
                <Text style={benefitText}>
                  <strong>Weekly Insights:</strong> Receive expert aquascaping tips, tutorials, and inspiration
                </Text>
              </div>
              <div style={benefitItem}>
                <span style={benefitIcon}>🤝</span>
                <Text style={benefitText}>
                  <strong>Community Access:</strong> Connect with fellow aquascapers and share your creations
                </Text>
              </div>
              <div style={benefitItem}>
                <span style={benefitIcon}>🎁</span>
                <Text style={benefitText}>
                  <strong>Exclusive Perks:</strong> Special discounts and early access to premium features
                </Text>
              </div>
            </div>

            {/* Referral Section */}
            <Section style={referralSection}>
              <Heading style={referralHeading}>
                Share the Wonder 🌊
              </Heading>
              <Text style={paragraph}>
                Know someone who loves aquascaping? Share your unique referral code and both earn exclusive rewards!
              </Text>
              <div style={referralCodeBox}>
                <Text style={referralCodeText}>Your Referral Code</Text>
                <Text style={referralCode}>{referralCode}</Text>
              </div>
              <Button style={referralButton} href={`https://aquascene.com/waitlist?ref=${referralCode}`}>
                Share with Friends
              </Button>
            </Section>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href="https://aquascene.com/blog">
                Explore Aquascaping Tips
              </Button>
              <Text style={ctaSubtext}>
                Start learning while you wait - dive into our comprehensive aquascaping guides
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Aquascene</strong> - Where underwater dreams come to life
            </Text>
            <Text style={footerLinks}>
              <Link href="https://aquascene.com" style={link}>Website</Link> • 
              <Link href="https://aquascene.com/blog" style={link}>Blog</Link> • 
              <Link href="https://instagram.com/aquascene" style={link}>Instagram</Link>
            </Text>
            <Text style={footerSmall}>
              You're receiving this email because you signed up for the Aquascene waitlist with {email}.
            </Text>
            <Text style={footerSmall}>
              <Link href="https://aquascene.com/unsubscribe" style={unsubscribeLink}>
                Unsubscribe
              </Link> • 
              <Link href="https://aquascene.com/privacy" style={unsubscribeLink}>
                Privacy Policy
              </Link> • 
              <Link href="https://aquascene.com/gdpr" style={unsubscribeLink}>
                GDPR Rights
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const header = {
  background: 'linear-gradient(135deg, #2D5A3D 0%, #4A90A4 50%, #1E3A5F 100%)',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const heroSection = {
  padding: '40px 24px 20px',
  textAlign: 'center' as const,
  background: 'linear-gradient(180deg, rgba(135, 206, 235, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
};

const heroHeading = {
  fontSize: '28px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const heroSubtext = {
  fontSize: '18px',
  lineHeight: '1.6',
  color: '#4A90A4',
  margin: '0',
  fontWeight: '500',
};

const content = {
  padding: '0 24px 24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 16px 0',
};

const benefitsList = {
  margin: '24px 0',
};

const benefitItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 16px 0',
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};

const benefitIcon = {
  fontSize: '20px',
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

const referralSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0f9ff',
  borderRadius: '12px',
  border: '1px solid #e0f2fe',
  textAlign: 'center' as const,
};

const referralHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const referralCodeBox = {
  margin: '20px 0',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '2px dashed #4A90A4',
};

const referralCodeText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  fontWeight: '500',
  letterSpacing: '0.05em',
};

const referralCode = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#2D5A3D',
  margin: '0',
  fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const referralButton = {
  backgroundColor: '#4A90A4',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '16px 0 0 0',
  border: 'none',
  cursor: 'pointer',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const primaryButton = {
  backgroundColor: '#2D5A3D',
  borderRadius: '8px',
  color: '#ffffff',
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