import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG, RATE_LIMITS } from '@/lib/resend';
import { WelcomeEmail } from '@/emails/welcome-email';
import { waitlistSchema } from '@/lib/validations';
import { z } from 'zod';

// Rate limiting store (in production, use Redis or proper storage)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Use centralized rate limiting configuration
const RATE_LIMIT = RATE_LIMITS.waitlist;

// Security validation schema
const secureWaitlistSchema = waitlistSchema.extend({
  honeypot: z.string().max(0, 'Bot detected'), // Honeypot should be empty
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
  return clientIP;
}

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return true;
  }

  if (clientData.count >= RATE_LIMIT.requests) {
    return false;
  }

  clientData.count += 1;
  return true;
}

function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.RESEND_API_KEY) {
    errors.push('RESEND_API_KEY is not configured');
  }
  if (!process.env.RESEND_FROM_EMAIL) {
    errors.push('RESEND_FROM_EMAIL is not configured');
  }
  if (!process.env.RESEND_TO_EMAIL) {
    errors.push('RESEND_TO_EMAIL is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function POST(request: NextRequest) {
  try {
    // Environment validation
    const envValidation = validateEnvironment();
    if (!envValidation.isValid) {
      console.error('Environment validation failed:', envValidation.errors);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Service configuration error',
          errors: envValidation.errors
        },
        { status: 500 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.',
          retryAfter: RATE_LIMIT.windowMs / 1000
        },
        { 
          status: 429,
          headers: {
            'Retry-After': (RATE_LIMIT.windowMs / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT.requests.toString(),
            'X-RateLimit-Window': (RATE_LIMIT.windowMs / 1000).toString()
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = secureWaitlistSchema.safeParse(body);

    if (!validationResult.success) {
      console.warn('Validation failed:', validationResult.error.flatten());
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, experience, interests, gdprConsent, marketingConsent, honeypot } = validationResult.data;

    // Honeypot check
    if (honeypot && honeypot.trim() !== '') {
      console.warn(`Bot detected from IP: ${clientIP}, honeypot value: ${honeypot}`);
      // Return success to not reveal bot detection
      return NextResponse.json({ success: true, position: Math.floor(Math.random() * 1000) + 100 });
    }

    // GDPR compliance check
    if (!gdprConsent) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'GDPR consent is required'
        },
        { status: 400 }
      );
    }

    // Generate position (in production, this would come from database)
    const position = Math.floor(Math.random() * 1000) + 1;

    // Send welcome email to subscriber
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.from!,
        to: email,
        subject: 'Welcome to Aquascene Waitlist!',
        react: WelcomeEmail({ name, position, interests: interests || [] }),
        // Security headers
        headers: {
          'X-Entity-Ref-ID': `waitlist-${Date.now()}`,
        },
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue execution - notification email is more important
    }

    // Send notification to admin
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.from!,
        to: EMAIL_CONFIG.adminEmail!,
        subject: `New Waitlist Signup: ${name}`,
        html: `
          <h2>New Waitlist Signup</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Interests:</strong> ${interests?.join(', ') || 'None specified'}</p>
          <p><strong>Marketing Consent:</strong> ${marketingConsent ? 'Yes' : 'No'}</p>
          <p><strong>Position:</strong> #${position}</p>
          <p><strong>IP Address:</strong> ${clientIP}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `,
        headers: {
          'X-Entity-Ref-ID': `admin-notification-${Date.now()}`,
        },
      });
    } catch (notificationError) {
      console.error('Failed to send admin notification:', notificationError);
      // Log but don't fail the request
    }

    console.log(`Successful waitlist signup: ${email} from IP: ${clientIP}`);

    return NextResponse.json({ 
      success: true, 
      position,
      message: 'Successfully joined the waitlist'
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    // Don't expose internal errors
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for waitlist statistics (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const providedKey = searchParams.get('key');
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || providedKey !== adminKey) {
      console.warn(`Unauthorized admin access attempt from IP: ${getClientIP(request)}`);
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In production, this would query a real database
    const stats = {
      total: Math.floor(Math.random() * 1000) + 100,
      recent: Math.floor(Math.random() * 50) + 10,
      breakdown: {
        beginner: 40,
        intermediate: 35,
        advanced: 20,
        professional: 5
      },
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({ success: true, data: stats });

  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}