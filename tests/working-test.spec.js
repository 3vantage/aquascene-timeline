const { test, expect } = require('@playwright/test');

test.describe('Aquascene Waitlist - Current State Analysis', () => {
  
  test('Capture homepage - Desktop', async ({ page }) => {
    await page.goto('http://localhost:3004/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshots
    await page.screenshot({ 
      path: 'test-results/homepage-desktop-full.png',
      fullPage: true 
    });
    
    await page.screenshot({ 
      path: 'test-results/homepage-desktop-fold.png'
    });
    
    // Get page info
    const title = await page.title();
    const url = page.url();
    const h1Count = await page.locator('h1').count();
    const h1Text = h1Count > 0 ? await page.locator('h1').first().textContent() : 'No H1 found';
    
    console.log('🏠 HOMEPAGE ANALYSIS:');
    console.log(`   Title: "${title}"`);
    console.log(`   URL: ${url}`);
    console.log(`   H1: "${h1Text}"`);
    console.log(`   H1 Count: ${h1Count}`);
    
    expect(title.length).toBeGreaterThan(0);
  });

  test('Mobile responsiveness check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3004/');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/homepage-mobile-full.png',
      fullPage: true 
    });
    
    // Check responsiveness
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const hasOverflow = bodyWidth > 375;
    
    console.log('📱 MOBILE ANALYSIS:');
    console.log(`   Body width: ${bodyWidth}px`);
    console.log(`   Viewport: 375px`);
    console.log(`   Horizontal overflow: ${hasOverflow ? '❌ YES' : '✅ NO'}`);
    
    if (hasOverflow) {
      console.log(`   Overflow amount: ${bodyWidth - 375}px`);
    }
  });

  test('Form and interaction elements', async ({ page }) => {
    await page.goto('http://localhost:3004/');
    await page.waitForLoadState('networkidle');
    
    // Count interactive elements
    const forms = await page.locator('form').count();
    const emailInputs = await page.locator('input[type="email"]').count();
    const textInputs = await page.locator('input[type="text"]').count();
    const buttons = await page.locator('button').count();
    const links = await page.locator('a').count();
    const selects = await page.locator('select').count();
    
    console.log('🔘 INTERACTIVE ELEMENTS:');
    console.log(`   Forms: ${forms}`);
    console.log(`   Email inputs: ${emailInputs}`);
    console.log(`   Text inputs: ${textInputs}`);
    console.log(`   Buttons: ${buttons}`);
    console.log(`   Links: ${links}`);
    console.log(`   Select dropdowns: ${selects}`);
    
    // Try to find and interact with form
    if (emailInputs > 0 || textInputs > 0 || forms > 0) {
      const input = page.locator('input').first();
      await input.scrollIntoViewIfNeeded();
      
      // Screenshot the form area
      await page.screenshot({ 
        path: 'test-results/form-section.png',
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
      
      // Try to fill the form
      const inputType = await input.getAttribute('type');
      const inputName = await input.getAttribute('name');
      const inputPlaceholder = await input.getAttribute('placeholder');
      
      console.log(`   First input: type="${inputType}", name="${inputName}", placeholder="${inputPlaceholder}"`);
      
      if (inputType === 'email' || inputName?.toLowerCase().includes('email')) {
        await input.fill('test@example.com');
      } else {
        await input.fill('Test User');
      }
      
      await page.screenshot({ 
        path: 'test-results/form-filled.png',
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
    }
  });

  test('Content structure analysis', async ({ page }) => {
    await page.goto('http://localhost:3004/');
    await page.waitForLoadState('networkidle');
    
    // Analyze page structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll(elements => {
      return elements.map(el => ({
        level: parseInt(el.tagName.charAt(1)),
        text: el.textContent?.trim().substring(0, 50)
      }));
    });
    
    const sections = await page.locator('section').count();
    const navElements = await page.locator('nav').count();
    const mainElements = await page.locator('main').count();
    const headerElements = await page.locator('header').count();
    const footerElements = await page.locator('footer').count();
    
    console.log('🏗️ CONTENT STRUCTURE:');
    console.log(`   Sections: ${sections}`);
    console.log(`   Nav elements: ${navElements}`);
    console.log(`   Main elements: ${mainElements}`);
    console.log(`   Header elements: ${headerElements}`);
    console.log(`   Footer elements: ${footerElements}`);
    console.log(`   Headings found: ${headings.length}`);
    
    headings.forEach((heading, i) => {
      console.log(`     H${heading.level}: "${heading.text}"`);
    });
  });

  test('Visual design assessment', async ({ page }) => {
    await page.goto('http://localhost:3004/');
    await page.waitForLoadState('networkidle');
    
    // Check for common design elements
    const images = await page.locator('img').count();
    const videos = await page.locator('video').count();
    const svgs = await page.locator('svg').count();
    
    // Check for animations/effects
    const animatedElements = await page.locator('[class*="animate"], [class*="transition"], [class*="motion"]').count();
    
    // Check color scheme
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    const textColor = await page.evaluate(() => {
      const p = document.querySelector('p, h1, h2, div');
      return p ? window.getComputedStyle(p).color : 'not found';
    });
    
    console.log('🎨 VISUAL DESIGN:');
    console.log(`   Images: ${images}`);
    console.log(`   Videos: ${videos}`);
    console.log(`   SVG graphics: ${svgs}`);
    console.log(`   Animated elements: ${animatedElements}`);
    console.log(`   Body background: ${bodyBg}`);
    console.log(`   Text color: ${textColor}`);
  });

  test('Performance and loading', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3004/');
    const domLoadTime = Date.now();
    
    await page.waitForLoadState('networkidle');
    const networkIdleTime = Date.now();
    
    const totalLoadTime = networkIdleTime - startTime;
    const domTime = domLoadTime - startTime;
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      const resources = performance.getEntriesByType('resource');
      
      return {
        domContentLoaded: nav?.domContentLoadedEventEnd - nav?.navigationStart || 0,
        loadComplete: nav?.loadEventEnd - nav?.navigationStart || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        transferSize: nav?.transferSize || 0,
        resourceCount: resources.length
      };
    });
    
    console.log('⚡ PERFORMANCE METRICS:');
    console.log(`   Total load time: ${totalLoadTime}ms`);
    console.log(`   DOM load time: ${domTime}ms`);
    console.log(`   DOM content loaded: ${metrics.domContentLoaded.toFixed(0)}ms`);
    console.log(`   First contentful paint: ${metrics.firstContentfulPaint.toFixed(0)}ms`);
    console.log(`   Transfer size: ${(metrics.transferSize / 1024).toFixed(1)}KB`);
    console.log(`   Resource requests: ${metrics.resourceCount}`);
    
    // Performance warnings
    if (totalLoadTime > 3000) console.log('   ⚠️ Slow total load time (>3s)');
    if (metrics.firstContentfulPaint > 2500) console.log('   ⚠️ Slow first paint (>2.5s)');
    if (metrics.transferSize > 1024 * 500) console.log('   ⚠️ Large transfer size (>500KB)');
  });
});