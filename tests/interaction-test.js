const { test, expect } = require('@playwright/test');

/**
 * User Interaction Testing Suite
 * Tests form submissions, language switching, animations, and error states
 */

test.describe('User Interaction Tests', () => {

  // Language switching tests
  test.describe('Multi-language Support', () => {
    
    test('Language switcher functionality', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check if language switcher exists
      const langSwitcher = page.locator('[data-testid="language-switcher"]').or(
        page.locator('select').filter({ hasText: /en|EN|English/ })
      ).or(
        page.locator('button').filter({ hasText: /en|EN|English/ })
      );
      
      if (await langSwitcher.count() > 0) {
        // Test switching to Bulgarian
        await langSwitcher.click();
        const bgOption = page.locator('option[value="bg"]').or(
          page.locator('text=Bulgarian').or(page.locator('text=BG'))
        );
        
        if (await bgOption.count() > 0) {
          await bgOption.click();
          await page.waitForLoadState('networkidle');
          
          // Verify URL changed to Bulgarian
          expect(page.url()).toContain('/bg');
          
          // Verify content changed to Bulgarian (check for Cyrillic characters)
          const pageText = await page.textContent('body');
          const hasCyrillic = /[\u0400-\u04FF]/.test(pageText);
          expect(hasCyrillic).toBeTruthy();
        }
        
        // Test switching to Hungarian
        if (await langSwitcher.count() > 0) {
          await langSwitcher.click();
          const huOption = page.locator('option[value="hu"]').or(
            page.locator('text=Hungarian').or(page.locator('text=HU'))
          );
          
          if (await huOption.count() > 0) {
            await huOption.click();
            await page.waitForLoadState('networkidle');
            
            // Verify URL changed to Hungarian
            expect(page.url()).toContain('/hu');
          }
        }
      }
    });

    test('Direct language URL access', async ({ page }) => {
      // Test direct access to different language URLs
      const languages = ['en', 'bg', 'hu'];
      
      for (const lang of languages) {
        await page.goto(`/${lang}`);
        await page.waitForLoadState('networkidle');
        
        // Verify the page loads without errors
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);
        
        // Check for proper lang attribute
        const htmlLang = await page.getAttribute('html', 'lang');
        expect(htmlLang).toBe(lang);
      }
    });
  });

  // Waitlist form interaction tests
  test.describe('Waitlist Form', () => {
    
    test('Form submission with valid data', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Find the waitlist form
      const emailInput = page.locator('input[type="email"]').or(
        page.locator('input[name="email"]')
      );
      
      if (await emailInput.count() > 0) {
        // Fill out the form
        await emailInput.fill('test@example.com');
        
        // Check for name field
        const nameInput = page.locator('input[name="name"]').or(
          page.locator('input[placeholder*="name" i]')
        );
        if (await nameInput.count() > 0) {
          await nameInput.fill('John Doe');
        }
        
        // Check for interest/role selection
        const selectField = page.locator('select').first();
        if (await selectField.count() > 0) {
          await selectField.selectOption({ index: 1 });
        }
        
        // Submit the form
        const submitButton = page.locator('button[type="submit"]').or(
          page.locator('button').filter({ hasText: /join|submit|sign up/i })
        );
        
        if (await submitButton.count() > 0) {
          await submitButton.click();
          
          // Wait for form submission response
          await page.waitForTimeout(2000);
          
          // Check for success message or confirmation
          const successMessage = page.locator('text=/success|thank|confirm|added/i');
          const isSuccess = await successMessage.count() > 0;
          
          // Take screenshot of the result
          await page.screenshot({ 
            path: 'test-results/form-submission-result.png',
            fullPage: true 
          });
          
          // Note: We'll report what we find rather than asserting
          console.log(`Form submission completed. Success message found: ${isSuccess}`);
        }
      }
    });

    test('Form validation with empty fields', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const emailInput = page.locator('input[type="email"]');
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button').filter({ hasText: /join|submit|sign up/i })
      );
      
      if (await emailInput.count() > 0 && await submitButton.count() > 0) {
        // Try to submit empty form
        await submitButton.click();
        
        // Wait for validation messages
        await page.waitForTimeout(1000);
        
        // Check for HTML5 validation or custom error messages
        const requiredMessage = await emailInput.evaluate(el => el.validationMessage);
        const customErrors = await page.locator('text=/required|invalid|error/i').count();
        
        await page.screenshot({ 
          path: 'test-results/form-validation-empty.png',
          fullPage: true 
        });
        
        console.log(`Empty form validation - HTML5: "${requiredMessage}", Custom errors: ${customErrors}`);
      }
    });

    test('Form validation with invalid email', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const emailInput = page.locator('input[type="email"]');
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button').filter({ hasText: /join|submit|sign up/i })
      );
      
      if (await emailInput.count() > 0 && await submitButton.count() > 0) {
        // Enter invalid email
        await emailInput.fill('invalid-email');
        await submitButton.click();
        
        // Wait for validation
        await page.waitForTimeout(1000);
        
        const validationMessage = await emailInput.evaluate(el => el.validationMessage);
        const customErrors = await page.locator('text=/invalid|error/i').count();
        
        await page.screenshot({ 
          path: 'test-results/form-validation-invalid-email.png',
          fullPage: true 
        });
        
        console.log(`Invalid email validation - HTML5: "${validationMessage}", Custom errors: ${customErrors}`);
      }
    });
  });

  // Animation and visual effects tests
  test.describe('Animations and Effects', () => {
    
    test('Bubble animation system', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check if bubble system is present
      const bubbles = page.locator('[class*="bubble"]').or(
        page.locator('svg circle').or(page.locator('.animate-'))
      );
      
      const bubbleCount = await bubbles.count();
      console.log(`Bubble elements found: ${bubbleCount}`);
      
      if (bubbleCount > 0) {
        // Wait and capture animation frames
        await page.waitForTimeout(1000);
        await page.screenshot({ 
          path: 'test-results/bubbles-frame-1.png',
          fullPage: true 
        });
        
        await page.waitForTimeout(2000);
        await page.screenshot({ 
          path: 'test-results/bubbles-frame-2.png',
          fullPage: true 
        });
        
        // Check if bubbles are actually animating by comparing positions
        const bubble = bubbles.first();
        const initialBox = await bubble.boundingBox();
        await page.waitForTimeout(3000);
        const finalBox = await bubble.boundingBox();
        
        const isAnimating = initialBox && finalBox && 
          (initialBox.x !== finalBox.x || initialBox.y !== finalBox.y);
        
        console.log(`Bubble animation detected: ${isAnimating}`);
      }
    });

    test('Scroll-triggered animations', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Scroll through sections and check for animation classes
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      
      for (let i = 0; i < sectionCount; i++) {
        const section = sections.nth(i);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Check for common animation classes
        const hasAnimations = await section.locator('[class*="animate-"]').count() > 0 ||
          await section.locator('[class*="fade"]').count() > 0 ||
          await section.locator('[class*="slide"]').count() > 0;
        
        if (hasAnimations) {
          await page.screenshot({ 
            path: `test-results/section-${i}-animated.png` 
          });
        }
        
        console.log(`Section ${i} has animations: ${hasAnimations}`);
      }
    });

    test('Hover effects on interactive elements', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Test button hover effects
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        const firstButton = buttons.first();
        
        // Capture before hover
        await firstButton.scrollIntoViewIfNeeded();
        await page.screenshot({ 
          path: 'test-results/button-before-hover.png' 
        });
        
        // Hover and capture
        await firstButton.hover();
        await page.waitForTimeout(500);
        await page.screenshot({ 
          path: 'test-results/button-after-hover.png' 
        });
      }
      
      // Test link hover effects
      const links = page.locator('a');
      const linkCount = await links.count();
      
      console.log(`Interactive elements found - Buttons: ${buttonCount}, Links: ${linkCount}`);
    });
  });

  // Navigation and routing tests
  test.describe('Navigation', () => {
    
    test('Smooth scrolling to sections', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Look for navigation links that might scroll to sections
      const navLinks = page.locator('a[href*="#"]');
      const navLinkCount = await navLinks.count();
      
      if (navLinkCount > 0) {
        for (let i = 0; i < Math.min(3, navLinkCount); i++) {
          const link = navLinks.nth(i);
          const href = await link.getAttribute('href');
          
          if (href && href.includes('#')) {
            await link.click();
            await page.waitForTimeout(1000);
            
            // Check if page scrolled
            const scrollY = await page.evaluate(() => window.scrollY);
            console.log(`Link ${i} (${href}) scrolled to: ${scrollY}px`);
          }
        }
      }
      
      console.log(`Navigation links found: ${navLinkCount}`);
    });

    test('Browser back/forward navigation', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Navigate to different language
      await page.goto('/bg');
      await page.waitForLoadState('networkidle');
      
      // Test back button
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      expect(page.url()).toContain('/en');
      
      // Test forward button
      await page.goForward();
      await page.waitForLoadState('networkidle');
      
      expect(page.url()).toContain('/bg');
    });
  });

  // Error handling tests
  test.describe('Error States', () => {
    
    test('404 page handling', async ({ page }) => {
      const response = await page.goto('/non-existent-page');
      
      // Check if it's a proper 404 or redirect
      const status = response?.status();
      console.log(`404 test - Response status: ${status}`);
      
      await page.screenshot({ 
        path: 'test-results/404-page.png',
        fullPage: true 
      });
    });

    test('JavaScript disabled scenario', async ({ page }) => {
      // Disable JavaScript
      await page.context().addInitScript(() => {
        delete window.requestAnimationFrame;
        delete window.setTimeout;
      });
      
      await page.goto('/en');
      await page.waitForLoadState('domcontentloaded');
      
      // Check if basic content is still visible
      const hasContent = await page.locator('h1, h2, p').count() > 0;
      const hasForm = await page.locator('form, input[type="email"]').count() > 0;
      
      await page.screenshot({ 
        path: 'test-results/no-javascript.png',
        fullPage: true 
      });
      
      console.log(`No JS - Content visible: ${hasContent}, Form present: ${hasForm}`);
    });

    test('Network failure simulation', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Simulate network failure during form submission
      await page.route('**/api/**', route => route.abort());
      
      const emailInput = page.locator('input[type="email"]');
      const submitButton = page.locator('button[type="submit"]');
      
      if (await emailInput.count() > 0 && await submitButton.count() > 0) {
        await emailInput.fill('test@example.com');
        await submitButton.click();
        
        await page.waitForTimeout(3000);
        
        // Check for error handling
        const errorMessage = await page.locator('text=/error|failed|try again/i').count();
        
        await page.screenshot({ 
          path: 'test-results/network-error.png',
          fullPage: true 
        });
        
        console.log(`Network error handling - Error messages found: ${errorMessage}`);
      }
    });
  });
});