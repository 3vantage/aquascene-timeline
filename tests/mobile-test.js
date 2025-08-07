const { test, expect } = require('@playwright/test');

/**
 * Mobile Experience Testing Suite
 * Tests mobile-specific interactions, touch gestures, and responsive behavior
 */

// Common mobile devices to test
const mobileDevices = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
  { name: 'Samsung Galaxy S21', width: 360, height: 800 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 }
];

test.describe('Mobile Experience Tests', () => {

  // Responsive layout tests
  test.describe('Responsive Design', () => {
    
    for (const device of mobileDevices) {
      test(`Layout on ${device.name} (${device.width}x${device.height})`, async ({ page }) => {
        await page.setViewportSize({ width: device.width, height: device.height });
        await page.goto('/en');
        await page.waitForLoadState('networkidle');
        
        // Check for horizontal scrollbar (indicates responsive issues)
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = device.width;
        
        const hasHorizontalScroll = bodyWidth > viewportWidth;
        
        console.log(`📱 ${device.name}:`);
        console.log(`   Body width: ${bodyWidth}px, Viewport: ${viewportWidth}px`);
        console.log(`   Horizontal scroll: ${hasHorizontalScroll ? '❌ YES' : '✅ NO'}`);
        
        if (hasHorizontalScroll) {
          console.log(`   ⚠️  Content overflows viewport by ${bodyWidth - viewportWidth}px`);
        }
        
        // Take screenshot for visual verification
        await page.screenshot({ 
          path: `test-results/mobile-${device.name.replace(/\s+/g, '-').toLowerCase()}.png`,
          fullPage: true 
        });
        
        // Check text readability (font sizes)
        const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span, div').evaluateAll(elements => {
          return elements.map(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            const text = el.textContent?.trim().substring(0, 50);
            return { fontSize, text };
          }).filter(item => item.text && item.text.length > 0);
        });
        
        const smallText = textElements.filter(el => el.fontSize < 14);
        if (smallText.length > 0) {
          console.log(`   ⚠️  Small text detected (${smallText.length} elements < 14px)`);
        }
        
        // Check button sizes for touch targets
        const buttons = await page.locator('button, a').evaluateAll(elements => {
          return elements.map(el => {
            const rect = el.getBoundingClientRect();
            return {
              width: rect.width,
              height: rect.height,
              area: rect.width * rect.height
            };
          });
        });
        
        const smallButtons = buttons.filter(btn => btn.width < 44 || btn.height < 44);
        if (smallButtons.length > 0) {
          console.log(`   ⚠️  Small touch targets detected (${smallButtons.length} buttons < 44px)`);
        }
      });
    }

    test('Orientation changes', async ({ page }) => {
      // Test portrait to landscape transition
      await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 portrait
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Capture portrait
      await page.screenshot({ path: 'test-results/mobile-portrait.png', fullPage: true });
      
      // Switch to landscape
      await page.setViewportSize({ width: 844, height: 390 }); // iPhone 12 landscape
      await page.waitForTimeout(1000); // Wait for reflow
      
      // Capture landscape
      await page.screenshot({ path: 'test-results/mobile-landscape.png', fullPage: true });
      
      // Check for layout issues in landscape
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const hasHorizontalScroll = bodyWidth > 844;
      
      console.log('🔄 ORIENTATION TEST:');
      console.log(`   Landscape horizontal scroll: ${hasHorizontalScroll ? '❌ YES' : '✅ NO'}`);
    });
  });

  // Touch interaction tests
  test.describe('Touch Interactions', () => {
    
    test('Touch gestures and scrolling', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Test vertical scrolling
      const initialScrollY = await page.evaluate(() => window.scrollY);
      
      // Simulate touch scroll
      await page.mouse.move(200, 400);
      await page.mouse.down();
      await page.mouse.move(200, 200); // Scroll up gesture
      await page.mouse.up();
      
      await page.waitForTimeout(500);
      const afterScrollY = await page.evaluate(() => window.scrollY);
      
      const didScroll = afterScrollY !== initialScrollY;
      console.log('👆 TOUCH SCROLLING:');
      console.log(`   Initial scroll: ${initialScrollY}px`);
      console.log(`   After touch: ${afterScrollY}px`);
      console.log(`   Scroll working: ${didScroll ? '✅ YES' : '❌ NO'}`);
      
      // Test smooth scrolling
      const scrollBehavior = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).scrollBehavior;
      });
      console.log(`   Scroll behavior: ${scrollBehavior}`);
    });

    test('Form interactions on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const emailInput = page.locator('input[type="email"]').first();
      
      if (await emailInput.count() > 0) {
        // Scroll to form
        await emailInput.scrollIntoViewIfNeeded();
        
        // Check if form is above the fold after scrolling
        const inputRect = await emailInput.boundingBox();
        const isVisible = inputRect && inputRect.y >= 0 && inputRect.y < 667;
        
        console.log('📝 MOBILE FORM:');
        console.log(`   Input visible after scroll: ${isVisible ? '✅ YES' : '❌ NO'}`);
        
        // Test touch tap
        await emailInput.tap();
        await page.waitForTimeout(500);
        
        // Check if keyboard appeared (viewport might change)
        const afterTapHeight = await page.evaluate(() => window.innerHeight);
        const keyboardAppeared = afterTapHeight < 667;
        
        console.log(`   Virtual keyboard appeared: ${keyboardAppeared ? '✅ YES' : '❌ NO'}`);
        
        // Test input with mobile keyboard
        await emailInput.fill('test@mobile.com');
        
        // Check input validation styling
        const hasError = await emailInput.evaluate(el => {
          const style = getComputedStyle(el);
          return style.borderColor.includes('red') || el.classList.contains('error');
        });
        
        const hasSuccess = await emailInput.evaluate(el => {
          const style = getComputedStyle(el);
          return style.borderColor.includes('green') || el.classList.contains('valid');
        });
        
        console.log(`   Input validation visual feedback: ${hasError || hasSuccess ? '✅ YES' : '❌ NO'}`);
        
        // Take screenshot of form interaction
        await page.screenshot({ path: 'test-results/mobile-form-interaction.png' });
      }
    });

    test('Button tap targets', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const buttons = page.locator('button, a[role="button"], input[type="submit"]');
      const buttonCount = await buttons.count();
      
      console.log('🔘 TOUCH TARGETS:');
      console.log(`   Total interactive elements: ${buttonCount}`);
      
      const buttonSizes = [];
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        
        if (box) {
          buttonSizes.push({
            width: box.width,
            height: box.height,
            area: box.width * box.height
          });
          
          const meetsMinSize = box.width >= 44 && box.height >= 44;
          const buttonText = await button.textContent();
          
          console.log(`   Button ${i + 1} ("${buttonText?.trim().substring(0, 20)}"): ${box.width.toFixed(0)}x${box.height.toFixed(0)}px ${meetsMinSize ? '✅' : '❌'}`);
        }
      }
      
      const adequateButtons = buttonSizes.filter(btn => btn.width >= 44 && btn.height >= 44);
      const touchTargetScore = buttonSizes.length > 0 ? (adequateButtons.length / buttonSizes.length * 100) : 100;
      
      console.log(`   Touch target compliance: ${touchTargetScore.toFixed(0)}% (${adequateButtons.length}/${buttonSizes.length})`);
    });
  });

  // Mobile-specific features
  test.describe('Mobile Features', () => {
    
    test('Viewport meta tag', async ({ page }) => {
      await page.goto('/en');
      
      const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
      
      console.log('📐 VIEWPORT META:');
      if (viewportMeta) {
        console.log(`   Content: ${viewportMeta}`);
        
        const hasWidth = viewportMeta.includes('width=device-width');
        const hasInitialScale = viewportMeta.includes('initial-scale=1');
        const hasUserScalable = viewportMeta.includes('user-scalable=no');
        
        console.log(`   Device width: ${hasWidth ? '✅ YES' : '❌ NO'}`);
        console.log(`   Initial scale: ${hasInitialScale ? '✅ YES' : '❌ NO'}`);
        console.log(`   User scalable disabled: ${hasUserScalable ? '⚠️  YES (accessibility concern)' : '✅ NO'}`);
      } else {
        console.log('   ❌ NO VIEWPORT META TAG FOUND');
      }
    });

    test('Mobile navigation patterns', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check for hamburger menu
      const hamburger = page.locator('[class*="hamburger"], [class*="menu-toggle"], [aria-label*="menu" i]').first();
      const hasHamburger = await hamburger.count() > 0;
      
      console.log('🍔 MOBILE NAVIGATION:');
      console.log(`   Hamburger menu: ${hasHamburger ? '✅ FOUND' : '❌ NOT FOUND'}`);
      
      if (hasHamburger) {
        // Test hamburger menu interaction
        await hamburger.tap();
        await page.waitForTimeout(500);
        
        // Check if menu opened
        const menuOpen = await page.locator('[class*="menu-open"], [class*="nav-open"], [aria-expanded="true"]').count() > 0;
        console.log(`   Menu opens on tap: ${menuOpen ? '✅ YES' : '❌ NO'}`);
        
        await page.screenshot({ path: 'test-results/mobile-menu-open.png' });
      }
      
      // Check for sticky header
      const header = page.locator('header, nav').first();
      if (await header.count() > 0) {
        const isSticky = await header.evaluate(el => {
          const style = getComputedStyle(el);
          return style.position === 'fixed' || style.position === 'sticky';
        });
        console.log(`   Sticky header: ${isSticky ? '✅ YES' : '❌ NO'}`);
      }
    });

    test('Performance on mobile devices', async ({ page }) => {
      // Simulate mobile device constraints
      const client = await page.context().newCDPSession(page);
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1600 * 1024, // 1.6 Mbps (3G)
        uploadThroughput: 750 * 1024,    // 750 Kbps
        latency: 150,                    // 150ms RTT
      });
      
      // Simulate slower mobile CPU
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      
      await page.setViewportSize({ width: 375, height: 667 });
      
      const startTime = Date.now();
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      console.log('📱 MOBILE PERFORMANCE:');
      console.log(`   Load time (throttled): ${loadTime}ms`);
      
      // Check for mobile-specific optimizations
      const hasLazyLoading = await page.locator('img[loading="lazy"]').count();
      const totalImages = await page.locator('img').count();
      
      console.log(`   Lazy loaded images: ${hasLazyLoading}/${totalImages}`);
      
      // Test scroll performance
      const scrollStart = Date.now();
      await page.evaluate(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      });
      await page.waitForTimeout(2000);
      const scrollTime = Date.now() - scrollStart;
      
      console.log(`   Scroll performance: ${scrollTime}ms to bottom`);
      
      if (loadTime > 5000) {
        console.log('   ⚠️  Slow mobile load time (>5s)');
      }
      
      if (scrollTime > 3000) {
        console.log('   ⚠️  Slow scroll performance');
      }
    });
  });

  // Accessibility on mobile
  test.describe('Mobile Accessibility', () => {
    
    test('Screen reader compatibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check for proper heading structure
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll(elements => {
        return elements.map((el, index) => ({
          level: parseInt(el.tagName.charAt(1)),
          text: el.textContent?.trim().substring(0, 50),
          index
        }));
      });
      
      console.log('♿ MOBILE ACCESSIBILITY:');
      console.log(`   Heading structure: ${headings.length} headings found`);
      
      // Check for skip links
      const skipLink = page.locator('a[href*="#"], [class*="skip"]').first();
      const hasSkipLink = await skipLink.count() > 0;
      console.log(`   Skip to content link: ${hasSkipLink ? '✅ YES' : '❌ NO'}`);
      
      // Check focus management
      const focusableElements = await page.locator('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])').count();
      console.log(`   Focusable elements: ${focusableElements}`);
      
      // Test keyboard navigation (important for switch control users)
      if (focusableElements > 0) {
        await page.keyboard.press('Tab');
        const activeElement = await page.evaluate(() => document.activeElement?.tagName);
        console.log(`   Tab navigation works: ${activeElement ? '✅ YES' : '❌ NO'}`);
      }
    });

    test('Color contrast on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Test in bright light simulation (high contrast mode)
      await page.emulateMedia({ colorScheme: 'light' });
      
      // Sample some text elements for contrast
      const textElements = await page.locator('p, h1, h2, h3, button, a').first();
      
      if (await textElements.count() > 0) {
        const colors = await textElements.evaluate(el => {
          const style = getComputedStyle(el);
          return {
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontSize: style.fontSize
          };
        });
        
        console.log('🎨 COLOR CONTRAST (Mobile):');
        console.log(`   Text color: ${colors.color}`);
        console.log(`   Background: ${colors.backgroundColor}`);
        console.log(`   Font size: ${colors.fontSize}`);
      }
      
      // Test dark mode compatibility
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'test-results/mobile-dark-mode.png', fullPage: true });
      
      console.log('   Dark mode test screenshot captured');
    });
  });
});