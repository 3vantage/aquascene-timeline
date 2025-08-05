import { z } from 'zod';

// Waitlist form validation schema
export const waitlistSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\u0400-\u04FF\s'-]+$/, 'Please enter a valid name'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  experience: z.enum(['beginner', 'intermediate', 'advanced', 'professional'], {
    required_error: 'Please select your experience level'
  }),
  
  interests: z
    .array(z.enum(['3d_design', 'calculations', 'community', 'mobile_app', 'ai_assistant']))
    .min(1, 'Please select at least one feature of interest'),
  
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, 'You must consent to receive updates'),
  
  marketingConsent: z.boolean().optional(),
  
  referralSource: z.string().optional(),
  
  // Anti-spam honeypot field (should be empty)
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, 'You must consent to receive updates'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, 'You must consent to data processing'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Blog comment schema
export const commentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  website: z
    .union([
      z.string().url('Please enter a valid URL'),
      z.string().length(0)
    ])
    .optional(),
  
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
});

export type CommentFormData = z.infer<typeof commentSchema>;

// Validation error formatter
export const formatValidationErrors = (error: z.ZodError) => {
  return error.errors.reduce((acc, curr) => {
    const path = curr.path.join('.');
    acc[path] = curr.message;
    return acc;
  }, {} as Record<string, string>);
};

// Email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Name validation utility
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0400-\u04FF\s'-]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
};

// Sanitize input utility
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Rate limiting helper
export const createRateLimitCheck = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): { allowed: boolean; remainingAttempts: number } => {
    const now = Date.now();
    const record = attempts.get(identifier);
    
    if (!record || now > record.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remainingAttempts: maxAttempts - 1 };
    }
    
    if (record.count >= maxAttempts) {
      return { allowed: false, remainingAttempts: 0 };
    }
    
    record.count++;
    return { allowed: true, remainingAttempts: maxAttempts - record.count };
  };
};

export default {
  waitlistSchema,
  newsletterSchema,
  contactSchema,
  commentSchema,
  formatValidationErrors,
  isValidEmail,
  isValidName,
  sanitizeInput,
  createRateLimitCheck,
};