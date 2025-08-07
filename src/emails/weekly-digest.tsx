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

export interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
  imageUrl: string;
  readTime: string;
  category: string;
}

export interface WeeklyDigestProps {
  firstName?: string;
  email?: string;
  weekNumber?: number;
  featuredPosts?: BlogPost[];
  tipOfTheWeek?: {
    title: string;
    content: string;
    imageUrl?: string;
  };
  communityHighlight?: {
    userName: string;
    location: string;
    achievement: string;
    imageUrl: string;
  };
}

export const WeeklyDigest = ({
  firstName = 'Aquascaper',
  email = 'user@example.com',
  weekNumber = 1,
  featuredPosts = [
    {
      title: 'Essential Aquascaping Tools for Beginners',
      excerpt: 'Discover the must-have tools that will help you create stunning underwater landscapes with precision and ease.',
      url: 'https://aquascene.com/blog/essential-aquascaping-tools',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      readTime: '5 min read',
      category: 'Beginner Guide',
    },
    {
      title: 'Choosing Your Aquascaping Style',
      excerpt: 'From Dutch to Iwagumi, explore different aquascaping styles to find the perfect aesthetic for your tank.',
      url: 'https://aquascene.com/blog/choosing-aquascaping-style',
      imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c891?w=400',
      readTime: '7 min read',
      category: 'Design',
    },
    {
      title: 'Maintaining Your Aquascape',
      excerpt: 'Learn the essential maintenance routines to keep your aquatic garden thriving and beautiful year-round.',
      url: 'https://aquascene.com/blog/maintaining-aquascape',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400',
      readTime: '6 min read',
      category: 'Maintenance',
    },
  ],
  tipOfTheWeek = {
    title: 'The Golden Ratio in Aquascaping',
    content: 'Use the rule of thirds when positioning your focal points. Place key elements like rocks or driftwood at 1/3 and 2/3 points of your tank for naturally pleasing compositions.',
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c891?w=300',
  },
  communityHighlight = {
    userName: 'Marina_Aqua',
    location: 'Netherlands',
    achievement: 'Created a stunning Dutch-style aquascape that won our monthly contest',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300',
  },
}: WeeklyDigestProps) => {
  const previewText = `Week ${weekNumber}: New aquascaping insights, tips, and community highlights`;

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
            <Text style={headerSubtext}>Weekly Digest</Text>
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={heroHeading}>
              Week {weekNumber} Highlights 🌊
            </Heading>
            <Text style={heroSubtext}>
              Hello {firstName}! Dive into this week's aquascaping inspiration, expert tips, and community achievements.
            </Text>
          </Section>

          {/* Featured Content */}
          <Section style={content}>
            <Heading style={sectionHeading}>
              📚 This Week's Featured Articles
            </Heading>
            
            {featuredPosts.map((post, index) => (
              <div key={index} style={articleCard}>
                <div style={articleImageContainer}>
                  <Img
                    src={post.imageUrl}
                    width="120"
                    height="80"
                    alt={post.title}
                    style={articleImage}
                  />
                  <div style={categoryBadge}>
                    {post.category}
                  </div>
                </div>
                <div style={articleContent}>
                  <Heading style={articleTitle}>
                    <Link href={post.url} style={articleLink}>
                      {post.title}
                    </Link>
                  </Heading>
                  <Text style={articleExcerpt}>
                    {post.excerpt}
                  </Text>
                  <div style={articleMeta}>
                    <span style={readTime}>{post.readTime}</span>
                    <Button style={readMoreButton} href={post.url}>
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Tip of the Week */}
            <Section style={tipSection}>
              <Heading style={tipHeading}>
                💡 Tip of the Week
              </Heading>
              <div style={tipCard}>
                <div style={tipContent}>
                  <Heading style={tipTitle}>{tipOfTheWeek.title}</Heading>
                  <Text style={tipText}>{tipOfTheWeek.content}</Text>
                </div>
                {tipOfTheWeek.imageUrl && (
                  <div style={tipImageContainer}>
                    <Img
                      src={tipOfTheWeek.imageUrl}
                      width="100"
                      height="80"
                      alt={tipOfTheWeek.title}
                      style={tipImage}
                    />
                  </div>
                )}
              </div>
            </Section>

            {/* Community Highlight */}
            <Section style={communitySection}>
              <Heading style={communityHeading}>
                🌟 Community Highlight
              </Heading>
              <div style={communityCard}>
                <Img
                  src={communityHighlight.imageUrl}
                  width="300"
                  height="200"
                  alt={`${communityHighlight.userName}'s aquascape`}
                  style={communityImage}
                />
                <div style={communityInfo}>
                  <Text style={communityUserName}>
                    @{communityHighlight.userName}
                  </Text>
                  <Text style={communityLocation}>
                    📍 {communityHighlight.location}
                  </Text>
                  <Text style={communityAchievement}>
                    {communityHighlight.achievement}
                  </Text>
                </div>
              </div>
            </Section>

            {/* Quick Links */}
            <Section style={quickLinksSection}>
              <Heading style={quickLinksHeading}>
                🔗 Quick Links
              </Heading>
              <div style={quickLinksGrid}>
                <Button style={quickLinkButton} href="https://aquascene.com/blog">
                  All Articles
                </Button>
                <Button style={quickLinkButton} href="https://aquascene.com/gallery">
                  Gallery
                </Button>
                <Button style={quickLinkButton} href="https://aquascene.com/tools">
                  Tools Guide
                </Button>
                <Button style={quickLinkButton} href="https://aquascene.com/community">
                  Community
                </Button>
              </div>
            </Section>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <div style={ctaCard}>
                <Heading style={ctaHeading}>
                  Ready to Create Your Masterpiece?
                </Heading>
                <Text style={ctaText}>
                  Join thousands of aquascapers who are already building their dream tanks. Get priority access when we launch!
                </Text>
                <Button style={primaryButton} href="https://aquascene.com/waitlist">
                  Secure Your Spot
                </Button>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Aquascene Weekly</strong> - Your source for aquascaping inspiration
            </Text>
            <Text style={footerLinks}>
              <Link href="https://aquascene.com" style={link}>Website</Link> • 
              <Link href="https://aquascene.com/blog" style={link}>Blog</Link> • 
              <Link href="https://instagram.com/aquascene" style={link}>Instagram</Link> • 
              <Link href="https://youtube.com/aquascene" style={link}>YouTube</Link>
            </Text>
            <Text style={footerSmall}>
              You're receiving this weekly digest because you're subscribed to Aquascene updates at {email}.
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

export default WeeklyDigest;

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
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const header = {
  background: 'linear-gradient(135deg, #2D5A3D 0%, #4A90A4 40%, #6B9B7C 100%)',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto 8px auto',
};

const headerSubtext = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const heroSection = {
  padding: '32px 24px',
  textAlign: 'center' as const,
  background: 'linear-gradient(180deg, rgba(107, 155, 124, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
};

const heroHeading = {
  fontSize: '28px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const heroSubtext = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#64748b',
  margin: '0',
};

const content = {
  padding: '0 24px 24px',
};

const sectionHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '32px 0 24px 0',
  paddingBottom: '8px',
  borderBottom: '2px solid #e2e8f0',
};

const articleCard = {
  display: 'flex',
  gap: '16px',
  padding: '20px',
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  margin: '0 0 20px 0',
};

const articleImageContainer = {
  position: 'relative' as const,
  flexShrink: 0,
};

const articleImage = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
};

const categoryBadge = {
  position: 'absolute' as const,
  top: '4px',
  left: '4px',
  backgroundColor: '#4A90A4',
  color: '#ffffff',
  fontSize: '10px',
  fontWeight: '600',
  padding: '2px 6px',
  borderRadius: '4px',
  textTransform: 'uppercase' as const,
};

const articleContent = {
  flex: '1',
};

const articleTitle = {
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  lineHeight: '1.4',
};

const articleLink = {
  color: '#2D5A3D',
  textDecoration: 'none',
};

const articleExcerpt = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#64748b',
  margin: '0 0 12px 0',
};

const articleMeta = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const readTime = {
  fontSize: '12px',
  color: '#94a3b8',
  fontWeight: '500',
};

const readMoreButton = {
  backgroundColor: '#6B9B7C',
  color: '#ffffff',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
};

const tipSection = {
  margin: '40px 0',
};

const tipHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const tipCard = {
  display: 'flex',
  gap: '16px',
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '12px',
  border: '1px solid #bae6fd',
};

const tipContent = {
  flex: '1',
};

const tipTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 8px 0',
};

const tipText = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0',
};

const tipImageContainer = {
  flexShrink: 0,
};

const tipImage = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
};

const communitySection = {
  margin: '40px 0',
};

const communityHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const communityCard = {
  padding: '20px',
  backgroundColor: '#fefce8',
  borderRadius: '12px',
  border: '1px solid #fde047',
  textAlign: 'center' as const,
};

const communityImage = {
  borderRadius: '8px',
  margin: '0 auto 16px auto',
  objectFit: 'cover' as const,
};

const communityInfo = {
  textAlign: 'center' as const,
};

const communityUserName = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 4px 0',
};

const communityLocation = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 8px 0',
};

const communityAchievement = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#374151',
  margin: '0',
};

const quickLinksSection = {
  margin: '40px 0',
};

const quickLinksHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 16px 0',
};

const quickLinksGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
};

const quickLinkButton = {
  backgroundColor: '#f1f5f9',
  color: '#4A90A4',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  border: '1px solid #e2e8f0',
  textAlign: 'center' as const,
  cursor: 'pointer',
};

const ctaSection = {
  margin: '40px 0',
};

const ctaCard = {
  padding: '32px 24px',
  backgroundColor: '#1e293b',
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
  backgroundColor: '#4A90A4',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  margin: '0',
  border: 'none',
  cursor: 'pointer',
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