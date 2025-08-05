import { NextRequest, NextResponse } from 'next/server';
import { waitlistSchema, WaitlistFormData, createRateLimitCheck } from '@/lib/validations';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend (will be configured with environment variables)
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: 5 attempts per hour per IP
const rateLimitCheck = createRateLimitCheck(5, 60 * 60 * 1000);

// In-memory storage for development (replace with database in production)
const waitlistEntries: Array<WaitlistFormData & { id: string; position: number; createdAt: Date }> = [];

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('remote-addr');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || remoteAddr || 'unknown';
}

// Helper function to generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Helper function to send notification email to owner
async function sendOwnerNotification(entry: WaitlistFormData & { position: number }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Resend API key not configured, skipping owner notification');
    return;
  }

  try {
    await resend.emails.send({
      from: 'waitlist@3vantage.com',
      to: 'gerasimovkris@3vantage.com',
      subject: `New Waitlist Signup: ${entry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D5A3D;">New Waitlist Signup</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${entry.name}</p>
            <p><strong>Email:</strong> ${entry.email}</p>
            <p><strong>Experience:</strong> ${entry.experience}</p>
            <p><strong>Interests:</strong> ${entry.interests.join(', ')}</p>
            <p><strong>Position:</strong> #${entry.position}</p>
            <p><strong>Marketing Consent:</strong> ${entry.marketingConsent ? 'Yes' : 'No'}</p>
            ${entry.referralSource ? `<p><strong>Referral Source:</strong> ${entry.referralSource}</p>` : ''}
          </div>
          <p style="color: #6C757D; font-size: 14px;">
            Total waitlist size: ${waitlistEntries.length}
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send owner notification:', error);
  }
}

// Helper function to send welcome email to subscriber
async function sendWelcomeEmail(entry: WaitlistFormData & { position: number }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Resend API key not configured, skipping welcome email');
    return;
  }

  try {
    await resend.emails.send({
      from: 'hello@3vantage.com',
      to: entry.email,
      subject: 'Welcome to 3vantage Aquascaping!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #2D5A3D 0%, #4A7C59 100%); color: white; padding: 40px 20px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0 0 10px 0; font-size: 28px;">Welcome to 3vantage!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 18px;">You're now part of the aquascaping revolution</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 24px; border-radius: 12px; margin: 30px 0; text-align: center;">
            <h2 style="color: #A8C9B0; margin: 0 0 10px 0; font-size: 24px;">You're #${entry.position} in line!</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 0;">Join ${entry.position > 1 ? (entry.position - 1) + ' other' : 'other'} aquascaping enthusiasts waiting for early access.</p>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: white; margin: 0 0 15px 0;">What's Next?</h3>
            <ul style="color: rgba(255,255,255,0.9); padding-left: 20px; line-height: 1.6;">
              <li>Get exclusive aquascaping tips and insights</li>
              <li>Early access to beta features</li>
              <li>Direct feedback channel to our team</li>
              <li>Special launch pricing (up to 50% off)</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://3vantage.com'}" 
               style="background: #FF6B6B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Share with Friends
            </a>
          </div>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;">
              Thanks for joining the aquascaping revolution!<br>
              The 3vantage Team
            </p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimitCheck(clientIP);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          message: 'Too many requests. Please try again later.',
          remainingAttempts: rateLimitResult.remainingAttempts 
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validationResult = waitlistSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Validation failed',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check for honeypot (spam detection)
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json(
        { message: 'Spam detected' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEntry = waitlistEntries.find(entry => 
      entry.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingEntry) {
      return NextResponse.json(
        { 
          message: 'This email is already on the waitlist',
          position: existingEntry.position
        },
        { status: 409 }
      );
    }

    // Create new waitlist entry
    const position = waitlistEntries.length + 1;
    const newEntry = {
      ...data,
      id: generateId(),
      position,
      createdAt: new Date()
    };

    // Add to waitlist
    waitlistEntries.push(newEntry);

    // Send emails asynchronously (don't block the response)
    Promise.all([
      sendWelcomeEmail(newEntry),
      sendOwnerNotification(newEntry)
    ]).catch(error => {
      console.error('Failed to send emails:', error);
    });

    // Return success response
    return NextResponse.json(
      {
        message: 'Successfully joined the waitlist!',
        position: position,
        totalSubscribers: waitlistEntries.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve waitlist stats (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication here
    const url = new URL(request.url);
    const adminKey = url.searchParams.get('key');
    
    // Simple admin key check (use proper auth in production)
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const stats = {
      totalEntries: waitlistEntries.length,
      recentEntries: waitlistEntries
        .slice(-10)
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          experience: entry.experience,
          position: entry.position,
          createdAt: entry.createdAt
        })),
      experienceBreakdown: {
        beginner: waitlistEntries.filter(e => e.experience === 'beginner').length,
        intermediate: waitlistEntries.filter(e => e.experience === 'intermediate').length,
        advanced: waitlistEntries.filter(e => e.experience === 'advanced').length,
        professional: waitlistEntries.filter(e => e.experience === 'professional').length,
      },
      marketingConsentCount: waitlistEntries.filter(e => e.marketingConsent).length,
      topInterests: entry => {
        const interests: Record<string, number> = {};
        waitlistEntries.forEach(entry => {
          entry.interests.forEach(interest => {
            interests[interest] = (interests[interest] || 0) + 1;
          });
        });
        return interests;
      }
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Waitlist GET API error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}