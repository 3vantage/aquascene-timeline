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

export interface ReferralInvitationProps {
  firstName?: string;
  email?: string;
  referralCode?: string;
  referralCount?: number;
  nextRewardThreshold?: number;
  rewards?: {
    level: number;
    description: string;
    requirement: string;
    status: 'locked' | 'unlocked' | 'claimed';
  }[];
  friendFirstName?: string;
}

export const ReferralInvitation = ({
  firstName = 'Aquascaper',
  email = 'user@example.com',
  referralCode = 'AQUA2024',
  referralCount = 3,
  nextRewardThreshold = 5,
  rewards = [
    {
      level: 1,
      description: '1 Month Premium Free',
      requirement: 'Refer 3 friends',
      status: 'claimed',
    },
    {
      level: 2,
      description: 'Exclusive Aquascaping Toolkit',
      requirement: 'Refer 5 friends',
      status: 'unlocked',
    },
    {
      level: 3,
      description: 'VIP Masterclass Access',
      requirement: 'Refer 10 friends',
      status: 'locked',
    },
    {
      level: 4,
      description: 'Custom Tank Design Session',
      requirement: 'Refer 20 friends',
      status: 'locked',
    },
  ],
  friendFirstName,
}: ReferralInvitationProps) => {
  const previewText = friendFirstName 
    ? `${friendFirstName} invited you to join Aquascene!`
    : `Share Aquascene and earn exclusive rewards!`;

  const isInvitation = !!friendFirstName;

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

          {/* Hero Section */}
          <Section style={heroSection}>
            {isInvitation ? (
              <>
                <div style={invitationIcon}>🎁</div>
                <Heading style={heroHeading}>
                  You're Invited to Join Aquascene!
                </Heading>
                <Text style={heroSubtext}>
                  {friendFirstName} thinks you'd love our aquascaping community and wants to share exclusive early access with you.
                </Text>
              </>
            ) : (
              <>
                <div style={shareIcon}>🌊</div>
                <Heading style={heroHeading}>
                  Share the Aquascaping Magic!
                </Heading>
                <Text style={heroSubtext}>
                  Invite your friends to join Aquascene and unlock amazing rewards together.
                </Text>
              </>
            )}
          </Section>

          {/* Progress Section (for existing users) */}
          {!isInvitation && (
            <Section style={progressSection}>
              <div style={progressCard}>
                <Heading style={progressHeading}>Your Referral Progress</Heading>
                <div style={progressStats}>
                  <div style={progressStat}>
                    <Text style={progressNumber}>{referralCount}</Text>
                    <Text style={progressLabel}>Friends Referred</Text>
                  </div>
                  <div style={progressArrow}>→</div>
                  <div style={progressStat}>
                    <Text style={progressNumber}>{nextRewardThreshold}</Text>
                    <Text style={progressLabel}>Next Reward</Text>
                  </div>
                </div>
                <div style={progressBar}>
                  <div 
                    style={{
                      ...progressFill,
                      width: `${Math.min((referralCount / nextRewardThreshold) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <Text style={progressText}>
                  Just {Math.max(nextRewardThreshold - referralCount, 0)} more referrals until your next reward!
                </Text>
              </div>
            </Section>
          )}

          {/* Main Content */}
          <Section style={content}>
            {isInvitation ? (
              <>
                <Text style={paragraph}>
                  Welcome! {friendFirstName} has invited you to experience the future of aquascaping with Aquascene.
                </Text>
                <Text style={paragraph}>
                  By joining through this exclusive invitation, you'll get:
                </Text>
                <div style={benefitsList}>
                  <div style={benefitItem}>
                    <span style={benefitIcon}>🚀</span>
                    <Text style={benefitText}>
                      <strong>Skip the waitlist</strong> - Get immediate access to our platform
                    </Text>
                  </div>
                  <div style={benefitItem}>
                    <span style={benefitIcon}>🎁</span>
                    <Text style={benefitText}>
                      <strong>30 days Premium free</strong> - Experience all features at no cost
                    </Text>
                  </div>
                  <div style={benefitItem}>
                    <span style={benefitIcon}>📚</span>
                    <Text style={benefitText}>
                      <strong>Bonus starter guide</strong> - Comprehensive aquascaping tutorial pack
                    </Text>
                  </div>
                  <div style={benefitItem}>
                    <span style={benefitIcon}>💬</span>
                    <Text style={benefitText}>
                      <strong>Community access</strong> - Connect with aquascapers worldwide
                    </Text>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Text style={greeting}>
                  Hello {firstName},
                </Text>
                <Text style={paragraph}>
                  Your aquascaping journey has been amazing, and we know your friends would love to experience the same magic. Share Aquascene with them and unlock exclusive rewards!
                </Text>
              </>
            )}

            {/* Referral Code Section */}
            <Section style={referralSection}>
              <Heading style={referralHeading}>
                {isInvitation ? '🎯 Your Exclusive Access Code' : '🔗 Your Unique Referral Code'}
              </Heading>
              <div style={referralCodeBox}>
                <Text style={referralCodeLabel}>
                  {isInvitation ? 'Invitation Code' : 'Referral Code'}
                </Text>
                <Text style={referralCodeValue}>{referralCode}</Text>
                <Text style={referralCodeNote}>
                  {isInvitation 
                    ? 'Use this code when signing up to claim your bonuses'
                    : 'Share this code with friends to track your referrals'
                  }
                </Text>
              </div>
            </Section>

            {/* How It Works */}
            <Section style={howItWorksSection}>
              <Heading style={howItWorksHeading}>
                {isInvitation ? 'How to Get Started' : 'How Referrals Work'}
              </Heading>
              
              <div style={stepsList}>
                {isInvitation ? (
                  <>
                    <div style={stepItem}>
                      <div style={stepNumber}>1</div>
                      <div style={stepContent}>
                        <Text style={stepTitle}>Click "Join Aquascene"</Text>
                        <Text style={stepDescription}>Create your account using the invitation link</Text>
                      </div>
                    </div>
                    <div style={stepItem}>
                      <div style={stepNumber}>2</div>
                      <div style={stepContent}>
                        <Text style={stepTitle}>Enter Your Code</Text>
                        <Text style={stepDescription}>Use code {referralCode} to unlock your bonuses</Text>
                      </div>
                    </div>
                    <div style={stepItem}>
                      <div style={stepNumber}>3</div>
                      <div style={stepContent}>
                        <Text style={stepTitle}>Start Creating</Text>
                        <Text style={stepDescription}>Explore our tools and join the community</Text>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={stepItem}>
                      <div style={stepNumber}>1</div>
                      <div style={stepContent}>
                        <Text style={stepTitle}>Share Your Code</Text>
                        <Text style={stepDescription}>Send your unique code to friends who love aquascaping</Text>
                      </div>
                    </div>
                    <div style={stepItem}>
                      <div style={stepNumber}>2</div>
                      <div style={stepContent}>
                        <Text style={stepTitle}>Friend Signs Up</Text>
                        <Text style={stepDescription}>They create an account using your referral code</Text>
                      </div>
                    </div>
                    <div style={stepItem}>
                      <div style={stepNumber}>3</div>
                      <div style={stepContent}>
                        <Text style={stepTitle}>Both Get Rewards</Text>
                        <Text style={stepDescription}>You both unlock exclusive benefits and bonuses</Text>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Section>

            {/* Rewards Section (for existing users) */}
            {!isInvitation && (
              <Section style={rewardsSection}>
                <Heading style={rewardsHeading}>
                  🏆 Unlock Amazing Rewards
                </Heading>
                <Text style={rewardsSubtext}>
                  The more friends you refer, the better your rewards get!
                </Text>
                
                <div style={rewardsList}>
                  {rewards.map((reward, index) => (
                    <div key={index} style={{
                      ...rewardCard,
                      ...(reward.status === 'claimed' ? rewardCardClaimed : 
                          reward.status === 'unlocked' ? rewardCardUnlocked : 
                          rewardCardLocked)
                    }}>
                      <div style={rewardHeader}>
                        <div style={rewardLevel}>Level {reward.level}</div>
                        <div style={{
                          ...rewardStatus,
                          ...(reward.status === 'claimed' ? rewardStatusClaimed : 
                              reward.status === 'unlocked' ? rewardStatusUnlocked : 
                              rewardStatusLocked)
                        }}>
                          {reward.status === 'claimed' ? '✓ Claimed' : 
                           reward.status === 'unlocked' ? '🎁 Available' : 
                           '🔒 Locked'}
                        </div>
                      </div>
                      <Text style={rewardDescription}>{reward.description}</Text>
                      <Text style={rewardRequirement}>{reward.requirement}</Text>
                      {reward.status === 'unlocked' && (
                        <Button style={claimButton} href="https://aquascene.com/rewards">
                          Claim Reward
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Social Sharing */}
            <Section style={socialSection}>
              <Heading style={socialHeading}>
                📱 Easy Sharing Options
              </Heading>
              <Text style={socialText}>
                Share Aquascene with your friends using these quick options:
              </Text>
              
              <div style={socialButtons}>
                <Button style={socialButton} href={`https://twitter.com/intent/tweet?text=Just%20discovered%20Aquascene%20-%20the%20future%20of%20aquascaping!%20Join%20me%20with%20code%20${referralCode}&url=https://aquascene.com/signup?ref=${referralCode}`}>
                  🐦 Twitter
                </Button>
                <Button style={socialButton} href={`https://www.facebook.com/sharer/sharer.php?u=https://aquascene.com/signup?ref=${referralCode}`}>
                  📘 Facebook
                </Button>
                <Button style={socialButton} href={`mailto:?subject=Join%20me%20on%20Aquascene&body=I've%20been%20using%20Aquascene%20for%20my%20aquascaping%20projects%20and%20thought%20you'd%20love%20it!%20Use%20my%20code%20${referralCode}%20to%20get%20started:%20https://aquascene.com/signup?ref=${referralCode}`}>
                  📧 Email
                </Button>
              </div>
            </Section>

            {/* Main CTA */}
            <Section style={ctaSection}>
              <div style={ctaCard}>
                <Heading style={ctaHeading}>
                  {isInvitation 
                    ? 'Ready to Start Your Aquascaping Journey?' 
                    : 'Start Sharing and Earning Today!'
                  }
                </Heading>
                <Text style={ctaText}>
                  {isInvitation
                    ? 'Join thousands of aquascapers who are already creating amazing underwater worlds.'
                    : 'Your friends are waiting to discover the magic of aquascaping. Share Aquascene today!'
                  }
                </Text>
                <Button style={primaryButton} href={`https://aquascene.com/signup?ref=${referralCode}`}>
                  {isInvitation ? 'Join Aquascene Now' : 'Share with Friends'}
                </Button>
                <Text style={ctaSubtext}>
                  {isInvitation 
                    ? `Don't forget to use code ${referralCode} during signup`
                    : 'Track your referrals and claim rewards in your dashboard'
                  }
                </Text>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Aquascene</strong> - Growing together, one tank at a time
            </Text>
            <Text style={footerLinks}>
              <Link href="https://aquascene.com" style={link}>Website</Link> • 
              <Link href="https://aquascene.com/referrals" style={link}>Referral Program</Link> • 
              <Link href="https://aquascene.com/community" style={link}>Community</Link> • 
              <Link href="https://instagram.com/aquascene" style={link}>Instagram</Link>
            </Text>
            <Text style={footerSmall}>
              {isInvitation 
                ? `This invitation was sent by ${friendFirstName} to ${email}.`
                : `You're receiving this referral update because you're subscribed to Aquascene at ${email}.`
              }
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

export default ReferralInvitation;

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
  background: 'linear-gradient(135deg, #4A90A4 0%, #2D5A3D 50%, #6B9B7C 100%)',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const heroSection = {
  padding: '40px 24px 20px',
  textAlign: 'center' as const,
  background: 'linear-gradient(180deg, rgba(74, 144, 164, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
};

const invitationIcon = {
  fontSize: '48px',
  margin: '0 0 20px 0',
};

const shareIcon = {
  fontSize: '48px',
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
  margin: '0',
};

const progressSection = {
  padding: '20px 24px',
  backgroundColor: '#fafafa',
};

const progressCard = {
  padding: '24px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  textAlign: 'center' as const,
};

const progressHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 20px 0',
};

const progressStats = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  margin: '0 0 16px 0',
};

const progressStat = {
  textAlign: 'center' as const,
};

const progressNumber = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#4A90A4',
  margin: '0 0 4px 0',
};

const progressLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0',
  textTransform: 'uppercase' as const,
  fontWeight: '500',
};

const progressArrow = {
  fontSize: '20px',
  color: '#94a3b8',
  fontWeight: '300',
};

const progressBar = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e5e7eb',
  borderRadius: '4px',
  overflow: 'hidden',
  margin: '0 0 12px 0',
};

const progressFill = {
  height: '100%',
  backgroundColor: '#4A90A4',
  borderRadius: '4px',
  transition: 'width 0.3s ease',
};

const progressText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
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
  margin: '0 0 20px 0',
};

const benefitsList = {
  margin: '24px 0',
};

const benefitItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 16px 0',
  padding: '12px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  border: '1px solid #bae6fd',
};

const benefitIcon = {
  fontSize: '18px',
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
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  textAlign: 'center' as const,
};

const referralHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 20px 0',
};

const referralCodeBox = {
  margin: '20px 0',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '2px dashed #4A90A4',
};

const referralCodeLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  fontWeight: '500',
  letterSpacing: '0.05em',
};

const referralCodeValue = {
  fontSize: '24px',
  fontWeight: '800',
  color: '#2D5A3D',
  margin: '0 0 8px 0',
  fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const referralCodeNote = {
  fontSize: '13px',
  color: '#64748b',
  margin: '0',
  lineHeight: '1.4',
};

const howItWorksSection = {
  margin: '40px 0',
};

const howItWorksHeading = {
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

const rewardsSection = {
  margin: '40px 0',
};

const rewardsHeading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
};

const rewardsSubtext = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const rewardsList = {
  display: 'grid',
  gap: '12px',
};

const rewardCard = {
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};

const rewardCardClaimed = {
  backgroundColor: '#f0fdf4',
  borderColor: '#bbf7d0',
};

const rewardCardUnlocked = {
  backgroundColor: '#fffbeb',
  borderColor: '#fed7aa',
};

const rewardCardLocked = {
  backgroundColor: '#f8fafc',
  borderColor: '#e2e8f0',
};

const rewardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 0 8px 0',
};

const rewardLevel = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
};

const rewardStatus = {
  fontSize: '11px',
  fontWeight: '600',
  padding: '2px 6px',
  borderRadius: '4px',
  textTransform: 'uppercase' as const,
};

const rewardStatusClaimed = {
  backgroundColor: '#dcfce7',
  color: '#166534',
};

const rewardStatusUnlocked = {
  backgroundColor: '#fef3c7',
  color: '#92400e',
};

const rewardStatusLocked = {
  backgroundColor: '#f1f5f9',
  color: '#64748b',
};

const rewardDescription = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 4px 0',
};

const rewardRequirement = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0 0 12px 0',
};

const claimButton = {
  backgroundColor: '#f59e0b',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '600',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
};

const socialSection = {
  margin: '40px 0',
};

const socialHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2D5A3D',
  margin: '0 0 12px 0',
  textAlign: 'center' as const,
};

const socialText = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const socialButtons = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap' as const,
};

const socialButton = {
  backgroundColor: '#f8fafc',
  color: '#374151',
  padding: '10px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
};

const ctaSection = {
  margin: '40px 0',
};

const ctaCard = {
  padding: '32px 24px',
  background: 'linear-gradient(135deg, #2D5A3D 0%, #4A90A4 100%)',
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