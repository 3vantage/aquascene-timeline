#!/usr/bin/env node

/**
 * Security Validation Script
 * Validates that all required environment variables are properly configured
 */

const requiredEnvVars = [
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'RESEND_TO_EMAIL',
  'ADMIN_KEY'
];

const optionalEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_BASE_URL',
  'RATE_LIMIT_REQUESTS',
  'RATE_LIMIT_WINDOW_MINUTES'
];

function validateEnvironment() {
  console.log('🔒 Security Validation Check');
  console.log('============================');
  
  let hasErrors = false;
  const warnings = [];

  // Check required environment variables
  console.log('\n📋 Required Environment Variables:');
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];
    if (!value) {
      console.log(`❌ ${envVar}: Not set`);
      hasErrors = true;
    } else {
      // Mask sensitive values
      const masked = envVar.includes('KEY') || envVar.includes('SECRET') 
        ? value.substring(0, 8) + '...' 
        : value;
      console.log(`✅ ${envVar}: ${masked}`);
    }
  }

  // Check optional environment variables
  console.log('\n📋 Optional Environment Variables:');
  for (const envVar of optionalEnvVars) {
    const value = process.env[envVar];
    if (value) {
      console.log(`✅ ${envVar}: ${value}`);
    } else {
      console.log(`⚠️  ${envVar}: Using default`);
      warnings.push(envVar);
    }
  }

  // Security checks
  console.log('\n🔐 Security Checks:');
  
  // Check API key format
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    if (apiKey.startsWith('re_') && apiKey.length > 20) {
      console.log('✅ RESEND_API_KEY: Valid format');
    } else {
      console.log('❌ RESEND_API_KEY: Invalid format (should start with "re_")');
      hasErrors = true;
    }
  }

  // Check email format
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (fromEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(fromEmail)) {
      console.log('✅ RESEND_FROM_EMAIL: Valid format');
    } else {
      console.log('❌ RESEND_FROM_EMAIL: Invalid email format');
      hasErrors = true;
    }
  }

  // Check admin key strength
  const adminKey = process.env.ADMIN_KEY;
  if (adminKey) {
    if (adminKey.length >= 16) {
      console.log('✅ ADMIN_KEY: Sufficient length');
    } else {
      console.log('⚠️  ADMIN_KEY: Consider using a longer key (16+ characters)');
      warnings.push('ADMIN_KEY length');
    }
  }

  // Summary
  console.log('\n📊 Summary:');
  if (hasErrors) {
    console.log('❌ Security validation failed. Please fix the errors above.');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log(`⚠️  Security validation passed with ${warnings.length} warning(s).`);
    console.log('💡 Consider addressing the warnings for better security.');
  } else {
    console.log('✅ All security checks passed!');
  }
}

// Run validation
validateEnvironment();