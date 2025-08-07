const { test, expect } = require('@playwright/test');

/**
 * Visual Testing Suite
 * Captures screenshots of the current state to identify visual issues
 */

// Desktop viewports to test
const desktopViewports = [
  { width: 1920, height: 1080, name: 'desktop-large' },
  { width: 1366, height: 768, name: 'desktop-medium' },
  { width: 1024, height: 768, name: 'desktop-small' }
];

// Mobile viewports to test
const mobileViewports = [
  { width: 375, height: 812, name: 'iphone-x' },
  { width: 390, height: 844, name: 'iphone-12' },
  { width: 360, height: 640, name: 'android-small' },
  { width: 414, height: 896, name: 'android-large' }
];

// Languages to test
const locales = ['en', 'bg', 'hu'];

test.describe('Visual Regression Testing', () => {
  
  // Test desktop layouts for all languages
  for (const locale of locales) {
    for (const viewport of desktopViewports) {
      test(`Desktop ${viewport.name} - ${locale.toUpperCase()} locale`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`/${locale}`);
        
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        
        // Wait for animations to settle
        await page.waitForTimeout(2000);
        
        // Capture full page screenshot
        await expect(page).toHaveScreenshot(`desktop-${viewport.name}-${locale}-full-page.png`, {
          fullPage: true,
          animations: 'disabled'
        });
        
        // Capture above-the-fold screenshot
        await expect(page).toHaveScreenshot(`desktop-${viewport.name}-${locale}-hero.png`, {
          animations: 'disabled'
        });
      });
    }
  }

  // Test mobile layouts for all languages
  for (const locale of locales) {
    for (const viewport of mobileViewports) {
      test(`Mobile ${viewport.name} - ${locale.toUpperCase()} locale`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`/${locale}`);
        
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        
        // Wait for animations to settle
        await page.waitForTimeout(2000);
        
        // Capture full page screenshot
        await expect(page).toHaveScreenshot(`mobile-${viewport.name}-${locale}-full-page.png`, {
          fullPage: true,
          animations: 'disabled'
        });
        
        // Capture above-the-fold screenshot
        await expect(page).toHaveScreenshot(`mobile-${viewport.name}-${locale}-hero.png`, {
          animations: 'disabled'
        });
      });
    }
  }

  // Test individual sections with animations enabled
  test('Hero section with animations - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en');
    
    await page.waitForLoadState('networkidle');
    
    // Wait for bubble animations to start
    await page.waitForTimeout(1000);
    
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveScreenshot('hero-section-animated.png');
  });

  test('Features section layout - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en');
    
    await page.waitForLoadState('networkidle');
    
    // Scroll to features section
    const featuresSection = page.locator('section').nth(1);
    await featuresSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await expect(featuresSection).toHaveScreenshot('features-section.png', {
      animations: 'disabled'
    });
  });

  test('Waitlist form section - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en');
    
    await page.waitForLoadState('networkidle');
    
    // Scroll to waitlist section
    const waitlistSection = page.getByText('Join the Waitlist').locator('..').locator('..');
    await waitlistSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await expect(waitlistSection).toHaveScreenshot('waitlist-section.png', {
      animations: 'disabled'
    });
  });

  test('Testimonials section - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en');
    
    await page.waitForLoadState('networkidle');
    
    // Scroll to testimonials section
    const testimonialsSection = page.locator('section').last();
    await testimonialsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await expect(testimonialsSection).toHaveScreenshot('testimonials-section.png', {
      animations: 'disabled'
    });
  });

  // Test color schemes and contrast
  test('Dark mode compatibility check', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Force dark mode via media query
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('dark-mode-full-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  // Test print styles
  test('Print layout', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Emulate print media
    await page.emulateMedia({ media: 'print' });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('print-layout.png', {
      fullPage: true
    });
  });

  // Test with reduced motion
  test('Reduced motion preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('reduced-motion.png', {
      fullPage: true
    });
  });
});