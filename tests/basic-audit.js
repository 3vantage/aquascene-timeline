const { test, expect } = require('@playwright/test');

/**
 * Basic Site Audit - Static Analysis
 * This performs a basic audit of the waitlist site to identify key issues
 */

test.describe('Aquascene Waitlist - Basic Audit', () => {
  
  test.beforeEach(async ({ page }) => {
    // Skip if no dev server is running
    try {
      await page.goto('http://localhost:3004/en', { timeout: 5000 });
    } catch (error) {
      test.skip('Dev server not running - run `npm run dev` first');
    }
  });

  test('Site loads and basic structure exists', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/current-homepage-desktop.png',
      fullPage: true 
    });
    
    // Check basic elements
    const title = await page.title();
    const hasH1 = await page.locator('h1').count() > 0;
    const hasNav = await page.locator('nav').count() > 0;
    const hasMain = await page.locator('main').count() > 0;
    const hasForm = await page.locator('form, input[type="email"]').count() > 0;
    
    console.log('📊 BASIC STRUCTURE ANALYSIS:');
    console.log(`   Page title: "${title}"`);
    console.log(`   Has H1: ${hasH1 ? '✅' : '❌'}`);
    console.log(`   Has navigation: ${hasNav ? '✅' : '❌'}`);
    console.log(`   Has main content: ${hasMain ? '✅' : '❌'}`);
    console.log(`   Has form: ${hasForm ? '✅' : '❌'}`);
    
    expect(title.length).toBeGreaterThan(0);
  });

  test('Mobile responsive check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/current-homepage-mobile.png',
      fullPage: true 
    });
    
    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    const hasHorizontalScroll = bodyWidth > viewportWidth;
    
    console.log('📱 MOBILE RESPONSIVENESS:');
    console.log(`   Body width: ${bodyWidth}px`);
    console.log(`   Viewport width: ${viewportWidth}px`);
    console.log(`   Horizontal scroll: ${hasHorizontalScroll ? '❌ YES' : '✅ NO'}`);
    
    if (hasHorizontalScroll) {
      console.log(`   Overflow: ${bodyWidth - viewportWidth}px`);
    }
  });

  test('Performance metrics', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    const metrics = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: perf?.loadEventEnd - perf?.navigationStart || 0,
        domContentLoaded: perf?.domContentLoadedEventEnd - perf?.navigationStart || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        transferSize: perf?.transferSize || 0,
      };
    });
    
    console.log('⚡ PERFORMANCE METRICS:');
    console.log(`   Total load time: ${loadTime}ms`);
    console.log(`   DOM loaded: ${metrics.domContentLoaded.toFixed(0)}ms`);
    console.log(`   First paint: ${metrics.firstContentfulPaint.toFixed(0)}ms`);
    console.log(`   Transfer size: ${(metrics.transferSize / 1024).toFixed(1)}KB`);
    
    // Performance flags
    if (loadTime > 3000) console.log('   ⚠️  Slow load time (>3s)');
    if (metrics.firstContentfulPaint > 2500) console.log('   ⚠️  Slow first paint (>2.5s)');
    if (metrics.transferSize > 1024 * 1024) console.log('   ⚠️  Large transfer size (>1MB)');
  });

  test('Accessibility basics', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check basic accessibility
    const h1Count = await page.locator('h1').count();
    const imgCount = await page.locator('img').count();
    const imgWithAlt = await page.locator('img[alt]').count();
    const formInputs = await page.locator('input').count();
    const labeledInputs = await page.locator('input').evaluateAll(inputs => {
      return inputs.filter(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        return label || input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      }).length;
    });
    
    console.log('♿ ACCESSIBILITY BASICS:');
    console.log(`   H1 elements: ${h1Count} ${h1Count === 1 ? '✅' : '❌'}`);
    console.log(`   Images with alt: ${imgWithAlt}/${imgCount} ${imgCount === imgWithAlt ? '✅' : '❌'}`);
    console.log(`   Labeled inputs: ${labeledInputs}/${formInputs} ${formInputs === labeledInputs ? '✅' : '❌'}`);
  });

  test('Languages available', async ({ page }) => {
    const languages = ['en', 'bg', 'hu'];
    const results = [];
    
    for (const lang of languages) {
      try {
        await page.goto(`/${lang}`);
        await page.waitForLoadState('networkidle');
        
        const title = await page.title();
        const hasContent = await page.locator('h1, h2, p').count() > 0;
        
        results.push({
          lang,
          loads: true,
          title,
          hasContent
        });
      } catch (error) {
        results.push({
          lang,
          loads: false,
          error: error.message
        });
      }
    }
    
    console.log('🌐 LANGUAGE SUPPORT:');
    results.forEach(result => {
      console.log(`   ${result.lang.toUpperCase()}: ${result.loads ? '✅' : '❌'} ${result.title || result.error || ''}`);
    });
  });
});