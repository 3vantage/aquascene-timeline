const { test, expect } = require('@playwright/test');

test.describe('Aquascene Waitlist Analysis', () => {
  
  test('Capture current homepage state - Desktop', async ({ page }) => {
    await page.goto('http://localhost:3004/en');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/homepage-desktop-full.png',
      fullPage: true 
    });
    
    // Take above-the-fold screenshot
    await page.screenshot({ 
      path: 'test-results/homepage-desktop-fold.png'
    });
    
    // Get basic page info
    const title = await page.title();
    const h1Text = await page.locator('h1').first().textContent();
    
    console.log(`Page title: ${title}`);
    console.log(`H1 text: ${h1Text}`);
    
    expect(title.length).toBeGreaterThan(0);
  });

  test('Capture mobile state', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3004/en');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/homepage-mobile-full.png',
      fullPage: true 
    });
    
    await page.screenshot({ 
      path: 'test-results/homepage-mobile-fold.png'
    });
    
    // Check for mobile responsiveness issues
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    console.log(`Mobile body width: ${bodyWidth}px (viewport: 375px)`);
    
    if (bodyWidth > 375) {
      console.log(`⚠️ Horizontal overflow: ${bodyWidth - 375}px`);
    }
  });

  test('Test language switching', async ({ page }) => {
    const languages = ['en', 'bg', 'hu'];
    
    for (const lang of languages) {
      await page.goto(`http://localhost:3004/${lang}`);
      await page.waitForLoadState('networkidle');
      
      const title = await page.title();
      const url = page.url();
      
      console.log(`${lang.toUpperCase()}: ${title} - ${url}`);
      
      await page.screenshot({ 
        path: `test-results/homepage-${lang}.png`,
        fullPage: true 
      });
    }
  });

  test('Analyze form and interactions', async ({ page }) => {
    await page.goto('http://localhost:3004/en');
    await page.waitForLoadState('networkidle');
    
    // Check for form elements
    const emailInputs = await page.locator('input[type="email"]').count();
    const buttons = await page.locator('button').count();
    const forms = await page.locator('form').count();
    
    console.log(`Form elements found:`);
    console.log(`  Email inputs: ${emailInputs}`);
    console.log(`  Buttons: ${buttons}`);
    console.log(`  Forms: ${forms}`);
    
    if (emailInputs > 0) {
      const emailInput = page.locator('input[type="email"]').first();
      await emailInput.scrollIntoViewIfNeeded();
      
      // Take screenshot of the form area
      await page.screenshot({ 
        path: 'test-results/waitlist-form.png'
      });
      
      // Test form interaction
      await emailInput.fill('test@example.com');
      await page.screenshot({ 
        path: 'test-results/form-filled.png'
      });
    }
  });

  test('Performance check', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3004/en');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        domContentLoaded: nav?.domContentLoadedEventEnd - nav?.navigationStart || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        transferSize: nav?.transferSize || 0
      };
    });
    
    console.log('Performance Metrics:');
    console.log(`  Total load time: ${loadTime}ms`);
    console.log(`  DOM loaded: ${metrics.domContentLoaded.toFixed(0)}ms`);
    console.log(`  First paint: ${metrics.firstContentfulPaint.toFixed(0)}ms`);
    console.log(`  Transfer size: ${(metrics.transferSize / 1024).toFixed(1)}KB`);
    
    // Performance flags
    if (loadTime > 3000) console.log('  ⚠️ Slow load time (>3s)');
    if (metrics.firstContentfulPaint > 2500) console.log('  ⚠️ Slow first paint (>2.5s)');
  });
});