const { test, expect } = require('@playwright/test');

/**
 * Accessibility Testing Suite
 * Tests WCAG compliance, keyboard navigation, and screen reader compatibility
 */

test.describe('Accessibility Compliance Tests', () => {

  test.describe('WCAG 2.1 AA Compliance', () => {
    
    test('Semantic HTML structure', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check for proper landmark elements
      const landmarks = await page.evaluate(() => {
        const results = {};
        results.main = document.querySelectorAll('main').length;
        results.nav = document.querySelectorAll('nav').length;
        results.header = document.querySelectorAll('header').length;
        results.footer = document.querySelectorAll('footer').length;
        results.aside = document.querySelectorAll('aside').length;
        results.section = document.querySelectorAll('section').length;
        return results;
      });
      
      console.log('🏗️  SEMANTIC STRUCTURE:');
      console.log(`   Main: ${landmarks.main} ${landmarks.main === 1 ? '✅' : landmarks.main === 0 ? '❌' : '⚠️'}`);
      console.log(`   Nav: ${landmarks.nav} ${landmarks.nav >= 1 ? '✅' : '❌'}`);
      console.log(`   Header: ${landmarks.header} ${landmarks.header >= 1 ? '✅' : '❌'}`);
      console.log(`   Footer: ${landmarks.footer} ${landmarks.footer >= 1 ? '✅' : '❌'}`);
      console.log(`   Sections: ${landmarks.section}`);
      
      // Check heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll(elements => {
        return elements.map(el => ({
          level: parseInt(el.tagName.charAt(1)),
          text: el.textContent?.trim(),
          hasId: !!el.id
        }));
      });
      
      console.log(`   Headings found: ${headings.length}`);
      
      const h1Count = headings.filter(h => h.level === 1).length;
      console.log(`   H1 elements: ${h1Count} ${h1Count === 1 ? '✅' : '❌'}`);
      
      // Check for heading gaps
      let hasGaps = false;
      for (let i = 1; i < headings.length; i++) {
        const currentLevel = headings[i].level;
        const previousLevel = headings[i - 1].level;
        if (currentLevel - previousLevel > 1) {
          hasGaps = true;
          console.log(`   ⚠️  Heading gap: H${previousLevel} → H${currentLevel}`);
        }
      }
      
      if (!hasGaps && headings.length > 0) {
        console.log('   Heading hierarchy: ✅ No gaps found');
      }
    });

    test('Form accessibility', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check form labels and accessibility
      const formElements = await page.locator('input, select, textarea').evaluateAll(elements => {
        return elements.map(el => {
          const id = el.id;
          const name = el.name;
          const type = el.type;
          const ariaLabel = el.getAttribute('aria-label');
          const ariaLabelledBy = el.getAttribute('aria-labelledby');
          const placeholder = el.placeholder;
          
          // Check for associated label
          const label = document.querySelector(`label[for="${id}"]`);
          const hasLabel = !!label;
          
          return {
            type,
            id,
            name,
            hasLabel,
            ariaLabel: !!ariaLabel,
            ariaLabelledBy: !!ariaLabelledBy,
            placeholder: !!placeholder,
            accessible: hasLabel || ariaLabel || ariaLabelledBy
          };
        });
      });
      
      console.log('📝 FORM ACCESSIBILITY:');
      console.log(`   Total form elements: ${formElements.length}`);
      
      const accessibleElements = formElements.filter(el => el.accessible);
      const accessibilityScore = formElements.length > 0 ? 
        (accessibleElements.length / formElements.length * 100) : 100;
      
      console.log(`   Properly labeled: ${accessibleElements.length}/${formElements.length} (${accessibilityScore.toFixed(0)}%)`);
      
      formElements.forEach((el, i) => {
        if (!el.accessible) {
          console.log(`   ❌ ${el.type} element missing label (id: ${el.id || 'none'})`);
        }
      });
      
      // Check for required field indicators
      const requiredFields = await page.locator('input[required], select[required], textarea[required]').count();
      const ariaRequired = await page.locator('[aria-required="true"]').count();
      
      console.log(`   Required fields: ${requiredFields} (aria-required: ${ariaRequired})`);
    });

    test('Image accessibility', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const images = await page.locator('img').evaluateAll(images => {
        return images.map(img => ({
          src: img.src.split('/').pop(),
          alt: img.alt,
          hasAlt: img.hasAttribute('alt'),
          isEmpty: img.alt === '',
          ariaHidden: img.getAttribute('aria-hidden') === 'true',
          role: img.getAttribute('role'),
          decorative: img.getAttribute('role') === 'presentation' || img.alt === ''
        }));
      });
      
      console.log('🖼️  IMAGE ACCESSIBILITY:');
      console.log(`   Total images: ${images.length}`);
      
      const imagesWithAlt = images.filter(img => img.hasAlt && img.alt.length > 0);
      const decorativeImages = images.filter(img => img.decorative || img.ariaHidden);
      const missingAlt = images.filter(img => !img.hasAlt);
      
      console.log(`   Images with alt text: ${imagesWithAlt.length}`);
      console.log(`   Decorative images: ${decorativeImages.length}`);
      console.log(`   Missing alt attribute: ${missingAlt.length}`);
      
      missingAlt.forEach(img => {
        console.log(`   ❌ Missing alt: ${img.src}`);
      });
      
      const altTextScore = images.length > 0 ? 
        ((imagesWithAlt.length + decorativeImages.length) / images.length * 100) : 100;
      
      console.log(`   Accessibility score: ${altTextScore.toFixed(0)}%`);
    });

    test('Color contrast analysis', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Sample text elements for manual contrast checking
      const textSamples = await page.locator('h1, h2, p, button, a').first().evaluateAll(elements => {
        return elements.slice(0, 10).map(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          
          // Get colors
          const color = style.color;
          const backgroundColor = style.backgroundColor;
          const fontSize = parseFloat(style.fontSize);
          const fontWeight = style.fontWeight;
          const text = el.textContent?.trim().substring(0, 30);
          
          return {
            text,
            color,
            backgroundColor,
            fontSize,
            fontWeight,
            isLarge: fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700))
          };
        });
      });
      
      console.log('🎨 COLOR CONTRAST SAMPLES:');
      textSamples.forEach((sample, i) => {
        console.log(`   ${i + 1}. "${sample.text}"`);
        console.log(`      Color: ${sample.color}`);
        console.log(`      Background: ${sample.backgroundColor}`);
        console.log(`      Font: ${sample.fontSize}px, weight: ${sample.fontWeight}`);
        console.log(`      Large text: ${sample.isLarge ? 'Yes (3:1 ratio needed)' : 'No (4.5:1 ratio needed)'}`);
        console.log('');
      });
      
      // Note: Actual contrast ratio calculation would require color parsing library
      console.log('   📋 Manual Review Required: Use a contrast checker tool to verify ratios');
    });
  });

  test.describe('Keyboard Navigation', () => {
    
    test('Tab order and focus management', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Get all focusable elements
      const focusableElements = await page.locator(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ).evaluateAll(elements => {
        return elements.map((el, index) => ({
          tagName: el.tagName.toLowerCase(),
          type: el.type || null,
          text: el.textContent?.trim().substring(0, 20) || el.value?.substring(0, 20) || '',
          tabIndex: el.tabIndex,
          href: el.href || null,
          id: el.id || null,
          index
        }));
      });
      
      console.log('⌨️  KEYBOARD NAVIGATION:');
      console.log(`   Focusable elements found: ${focusableElements.length}`);
      
      // Test tab navigation
      const tabSequence = [];
      
      for (let i = 0; i < Math.min(10, focusableElements.length); i++) {
        await page.keyboard.press('Tab');
        
        const activeElement = await page.evaluate(() => {
          const active = document.activeElement;
          return {
            tagName: active?.tagName.toLowerCase(),
            text: active?.textContent?.trim().substring(0, 20),
            id: active?.id,
            className: active?.className
          };
        });
        
        tabSequence.push(activeElement);
      }
      
      console.log('   Tab sequence (first 10):');
      tabSequence.forEach((el, i) => {
        console.log(`   ${i + 1}. ${el.tagName} - "${el.text}" ${el.id ? `(#${el.id})` : ''}`);
      });
      
      // Test focus indicators
      await page.keyboard.press('Tab');
      const hasFocusIndicator = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active) return false;
        
        const style = getComputedStyle(active);
        return style.outline !== 'none' || 
               style.boxShadow !== 'none' || 
               active.classList.contains('focus') ||
               active.classList.contains('focused');
      });
      
      console.log(`   Focus indicators visible: ${hasFocusIndicator ? '✅ YES' : '❌ NO'}`);
    });

    test('Skip navigation links', async ({ page }) => {
      await page.goto('/en');
      
      // Test for skip links (usually hidden until focused)
      await page.keyboard.press('Tab');
      
      const skipLink = await page.evaluate(() => {
        const active = document.activeElement;
        if (active && active.href && active.href.includes('#')) {
          return {
            text: active.textContent?.trim(),
            href: active.href,
            visible: active.offsetParent !== null
          };
        }
        return null;
      });
      
      console.log('🦘 SKIP NAVIGATION:');
      if (skipLink) {
        console.log(`   Skip link found: "${skipLink.text}"`);
        console.log(`   Target: ${skipLink.href}`);
        console.log(`   Visible when focused: ${skipLink.visible ? '✅ YES' : '❌ NO'}`);
        
        // Test skip link functionality
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
        
        const scrollPosition = await page.evaluate(() => window.scrollY);
        console.log(`   Skip link works: ${scrollPosition > 0 ? '✅ YES' : '❌ NO'}`);
      } else {
        console.log('   ❌ No skip links found');
      }
    });

    test('Escape key handling', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Look for modals, dropdowns, or overlays
      const overlayElements = await page.locator('[role="dialog"], [role="menu"], .modal, .dropdown, .overlay').count();
      
      console.log('⎋ ESCAPE KEY HANDLING:');
      console.log(`   Overlay elements found: ${overlayElements}`);
      
      if (overlayElements > 0) {
        // Try to open and close with escape
        const firstOverlay = page.locator('[role="dialog"], [role="menu"], .modal, .dropdown').first();
        
        // Try to trigger the overlay (this may not work for all types)
        const trigger = page.locator('button, [aria-haspopup]').first();
        if (await trigger.count() > 0) {
          await trigger.click();
          await page.waitForTimeout(500);
          
          // Try escape key
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
          
          const isStillVisible = await firstOverlay.isVisible();
          console.log(`   Escape closes overlay: ${!isStillVisible ? '✅ YES' : '❌ NO'}`);
        }
      } else {
        console.log('   No testable overlay elements found');
      }
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    
    test('ARIA labels and descriptions', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const ariaElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
        
        return Array.from(elements).map(el => ({
          tagName: el.tagName.toLowerCase(),
          role: el.getAttribute('role'),
          ariaLabel: el.getAttribute('aria-label'),
          ariaLabelledby: el.getAttribute('aria-labelledby'),
          ariaDescribedby: el.getAttribute('aria-describedby'),
          text: el.textContent?.trim().substring(0, 30)
        }));
      });
      
      console.log('🗣️  ARIA ATTRIBUTES:');
      console.log(`   Elements with ARIA: ${ariaElements.length}`);
      
      const roleCount = ariaElements.filter(el => el.role).length;
      const labelCount = ariaElements.filter(el => el.ariaLabel).length;
      const labelledByCount = ariaElements.filter(el => el.ariaLabelledby).length;
      
      console.log(`   Role attributes: ${roleCount}`);
      console.log(`   Aria-label: ${labelCount}`);
      console.log(`   Aria-labelledby: ${labelledByCount}`);
      
      // Check for common interactive elements that should have roles
      const buttons = await page.locator('button').count();
      const links = await page.locator('a').count();
      const inputs = await page.locator('input').count();
      
      console.log(`   Interactive elements: ${buttons} buttons, ${links} links, ${inputs} inputs`);
    });

    test('Live regions for dynamic content', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const liveRegions = await page.evaluate(() => {
        const regions = document.querySelectorAll('[aria-live], [role="status"], [role="alert"]');
        
        return Array.from(regions).map(el => ({
          tagName: el.tagName.toLowerCase(),
          ariaLive: el.getAttribute('aria-live'),
          role: el.getAttribute('role'),
          text: el.textContent?.trim()
        }));
      });
      
      console.log('📢 LIVE REGIONS:');
      console.log(`   Live regions found: ${liveRegions.length}`);
      
      liveRegions.forEach((region, i) => {
        console.log(`   ${i + 1}. ${region.tagName} - live: ${region.ariaLive || 'none'}, role: ${region.role || 'none'}`);
      });
      
      if (liveRegions.length === 0) {
        console.log('   ⚠️  No live regions found - form feedback may not be announced');
      }
    });

    test('Table accessibility', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const tables = await page.locator('table').evaluateAll(tables => {
        return tables.map(table => {
          const caption = table.querySelector('caption');
          const thead = table.querySelector('thead');
          const tbody = table.querySelector('tbody');
          const headers = table.querySelectorAll('th');
          
          return {
            hasCaption: !!caption,
            captionText: caption?.textContent?.trim(),
            hasTheadTbody: !!(thead && tbody),
            headerCount: headers.length,
            hasScope: Array.from(headers).some(th => th.hasAttribute('scope'))
          };
        });
      });
      
      console.log('📊 TABLE ACCESSIBILITY:');
      console.log(`   Tables found: ${tables.length}`);
      
      tables.forEach((table, i) => {
        console.log(`   Table ${i + 1}:`);
        console.log(`     Caption: ${table.hasCaption ? '✅' : '❌'} ${table.captionText || ''}`);
        console.log(`     Thead/Tbody: ${table.hasTheadTbody ? '✅' : '❌'}`);
        console.log(`     Headers: ${table.headerCount}`);
        console.log(`     Scope attributes: ${table.hasScope ? '✅' : '❌'}`);
      });
    });
  });

  test.describe('Motion and Animation Accessibility', () => {
    
    test('Respects reduced motion preference', async ({ page }) => {
      // Test with reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check if animations are disabled
      const hasReducedMotion = await page.evaluate(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      });
      
      console.log('🎭 MOTION ACCESSIBILITY:');
      console.log(`   Reduced motion detected: ${hasReducedMotion ? '✅ YES' : '❌ NO'}`);
      
      // Check CSS for reduced motion handling
      const hasReducedMotionCSS = await page.evaluate(() => {
        const styles = Array.from(document.styleSheets);
        let found = false;
        
        try {
          styles.forEach(sheet => {
            Array.from(sheet.cssRules || []).forEach(rule => {
              if (rule.media && rule.media.mediaText.includes('prefers-reduced-motion')) {
                found = true;
              }
            });
          });
        } catch (e) {
          // CSS access might be restricted
        }
        
        return found;
      });
      
      console.log(`   CSS handles reduced motion: ${hasReducedMotionCSS ? '✅ YES' : '❌ NO'}`);
      
      // Take screenshot with reduced motion
      await page.screenshot({ 
        path: 'test-results/reduced-motion-accessibility.png',
        fullPage: true 
      });
    });

    test('Auto-playing content controls', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Check for auto-playing videos or animations
      const mediaElements = await page.evaluate(() => {
        const videos = Array.from(document.querySelectorAll('video'));
        const audios = Array.from(document.querySelectorAll('audio'));
        
        return {
          videos: videos.map(v => ({
            autoplay: v.hasAttribute('autoplay'),
            muted: v.hasAttribute('muted'),
            controls: v.hasAttribute('controls'),
            src: v.src || 'embedded'
          })),
          audios: audios.map(a => ({
            autoplay: a.hasAttribute('autoplay'),
            controls: a.hasAttribute('controls'),
            src: a.src || 'embedded'
          }))
        };
      });
      
      console.log('🎬 AUTO-PLAYING CONTENT:');
      console.log(`   Videos: ${mediaElements.videos.length}`);
      console.log(`   Audios: ${mediaElements.audios.length}`);
      
      mediaElements.videos.forEach((video, i) => {
        console.log(`   Video ${i + 1}: autoplay=${video.autoplay}, muted=${video.muted}, controls=${video.controls}`);
        if (video.autoplay && !video.muted) {
          console.log(`     ⚠️  Auto-playing video with sound - accessibility concern`);
        }
      });
      
      mediaElements.audios.forEach((audio, i) => {
        console.log(`   Audio ${i + 1}: autoplay=${audio.autoplay}, controls=${audio.controls}`);
        if (audio.autoplay) {
          console.log(`     ⚠️  Auto-playing audio - accessibility concern`);
        }
      });
    });
  });
});