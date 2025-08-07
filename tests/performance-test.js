const { test, expect } = require('@playwright/test');

/**
 * Performance Testing Suite
 * Measures loading performance, Core Web Vitals, and identifies bottlenecks
 */

test.describe('Performance Tests', () => {

  // Core Web Vitals and loading performance
  test.describe('Loading Performance', () => {
    
    test('Page load metrics - Desktop', async ({ page }) => {
      const startTime = Date.now();
      
      // Start monitoring performance
      await page.goto('/en');
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      
      const endTime = Date.now();
      const totalLoadTime = endTime - startTime;
      
      // Get performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
        const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0;
        
        return {
          domContentLoaded: perf?.domContentLoadedEventEnd - perf?.domContentLoadedEventStart || 0,
          loadComplete: perf?.loadEventEnd - perf?.loadEventStart || 0,
          firstContentfulPaint: fcp,
          largestContentfulPaint: lcp,
          domInteractive: perf?.domInteractive - perf?.navigationStart || 0,
          totalTime: perf?.loadEventEnd - perf?.navigationStart || 0,
          transferSize: perf?.transferSize || 0,
          encodedBodySize: perf?.encodedBodySize || 0,
          decodedBodySize: perf?.decodedBodySize || 0,
        };
      });
      
      // Log performance results
      console.log('🚀 DESKTOP PERFORMANCE METRICS:');
      console.log(`   Total Load Time: ${totalLoadTime}ms`);
      console.log(`   DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
      console.log(`   First Contentful Paint: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`);
      console.log(`   Largest Contentful Paint: ${performanceMetrics.largestContentfulPaint.toFixed(2)}ms`);
      console.log(`   DOM Interactive: ${performanceMetrics.domInteractive}ms`);
      console.log(`   Transfer Size: ${(performanceMetrics.transferSize / 1024).toFixed(2)} KB`);
      console.log(`   Decoded Body Size: ${(performanceMetrics.decodedBodySize / 1024).toFixed(2)} KB`);
      
      // Performance assertions (guidelines, not hard failures)
      const issues = [];
      
      if (performanceMetrics.firstContentfulPaint > 2500) {
        issues.push(`FCP too slow: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms (target: <2.5s)`);
      }
      
      if (performanceMetrics.largestContentfulPaint > 4000) {
        issues.push(`LCP too slow: ${performanceMetrics.largestContentfulPaint.toFixed(2)}ms (target: <4s)`);
      }
      
      if (performanceMetrics.transferSize > 1024 * 1024) { // 1MB
        issues.push(`Transfer size too large: ${(performanceMetrics.transferSize / 1024 / 1024).toFixed(2)}MB (target: <1MB)`);
      }
      
      if (issues.length > 0) {
        console.log('⚠️  PERFORMANCE ISSUES DETECTED:');
        issues.forEach(issue => console.log(`   - ${issue}`));
      }
      
      // Store metrics for report
      await page.evaluate((metrics) => {
        window.performanceResults = window.performanceResults || {};
        window.performanceResults.desktop = metrics;
      }, performanceMetrics);
    });

    test('Page load metrics - Mobile', async ({ page }) => {
      // Simulate mobile device
      await page.emulateMedia({ colorScheme: 'light' });
      await page.setViewportSize({ width: 375, height: 812 });
      
      // Simulate slower mobile connection
      const client = await page.context().newCDPSession(page);
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1600 * 1024, // 1.6 Mbps
        uploadThroughput: 750 * 1024,    // 750 Kbps
        latency: 150,                    // 150ms RTT
      });
      
      const startTime = Date.now();
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      const endTime = Date.now();
      
      const performanceMetrics = await page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
        const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0;
        
        return {
          totalLoadTime: endTime - startTime,
          firstContentfulPaint: fcp,
          largestContentfulPaint: lcp,
          domInteractive: perf?.domInteractive - perf?.navigationStart || 0,
          transferSize: perf?.transferSize || 0,
        };
      });
      
      console.log('📱 MOBILE PERFORMANCE METRICS (Slow 3G):');
      console.log(`   Total Load Time: ${endTime - startTime}ms`);
      console.log(`   First Contentful Paint: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`);
      console.log(`   Largest Contentful Paint: ${performanceMetrics.largestContentfulPaint.toFixed(2)}ms`);
      console.log(`   DOM Interactive: ${performanceMetrics.domInteractive}ms`);
      
      // Mobile performance is typically slower
      const mobileIssues = [];
      
      if (performanceMetrics.firstContentfulPaint > 4000) {
        mobileIssues.push(`Mobile FCP too slow: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`);
      }
      
      if (performanceMetrics.largestContentfulPaint > 6000) {
        mobileIssues.push(`Mobile LCP too slow: ${performanceMetrics.largestContentfulPaint.toFixed(2)}ms`);
      }
      
      if (mobileIssues.length > 0) {
        console.log('⚠️  MOBILE PERFORMANCE ISSUES:');
        mobileIssues.forEach(issue => console.log(`   - ${issue}`));
      }
    });
  });

  // Resource analysis
  test.describe('Resource Analysis', () => {
    
    test('JavaScript bundle analysis', async ({ page }) => {
      const resources = [];
      
      page.on('response', response => {
        const url = response.url();
        const resourceType = response.request().resourceType();
        
        if (resourceType === 'script' || resourceType === 'stylesheet' || resourceType === 'font') {
          resources.push({
            url: url,
            type: resourceType,
            status: response.status(),
            size: response.headers()['content-length'] || 0,
          });
        }
      });
      
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Analyze resources
      const scripts = resources.filter(r => r.type === 'script');
      const styles = resources.filter(r => r.type === 'stylesheet');
      const fonts = resources.filter(r => r.type === 'font');
      
      const totalScriptSize = scripts.reduce((sum, script) => sum + parseInt(script.size || 0), 0);
      const totalStyleSize = styles.reduce((sum, style) => sum + parseInt(style.size || 0), 0);
      const totalFontSize = fonts.reduce((sum, font) => sum + parseInt(font.size || 0), 0);
      
      console.log('📦 RESOURCE ANALYSIS:');
      console.log(`   JavaScript files: ${scripts.length} (${(totalScriptSize / 1024).toFixed(2)} KB)`);
      console.log(`   CSS files: ${styles.length} (${(totalStyleSize / 1024).toFixed(2)} KB)`);
      console.log(`   Font files: ${fonts.length} (${(totalFontSize / 1024).toFixed(2)} KB)`);
      
      // List large resources
      const largeResources = resources.filter(r => parseInt(r.size || 0) > 100 * 1024); // >100KB
      if (largeResources.length > 0) {
        console.log('   🚨 Large resources (>100KB):');
        largeResources.forEach(resource => {
          console.log(`     - ${resource.url.split('/').pop()}: ${(parseInt(resource.size) / 1024).toFixed(2)} KB`);
        });
      }
      
      // Check for failed resources
      const failedResources = resources.filter(r => r.status >= 400);
      if (failedResources.length > 0) {
        console.log('   ❌ Failed resources:');
        failedResources.forEach(resource => {
          console.log(`     - ${resource.url} (Status: ${resource.status})`);
        });
      }
    });

    test('Image optimization analysis', async ({ page }) => {
      const images = [];
      
      page.on('response', response => {
        const url = response.url();
        const contentType = response.headers()['content-type'] || '';
        
        if (contentType.startsWith('image/')) {
          images.push({
            url: url,
            contentType: contentType,
            size: response.headers()['content-length'] || 0,
            status: response.status(),
          });
        }
      });
      
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Also check for images in the DOM
      const domImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src,
          alt: img.alt,
          width: img.naturalWidth,
          height: img.naturalHeight,
          loading: img.loading,
        }));
      });
      
      console.log('🖼️  IMAGE ANALYSIS:');
      console.log(`   Images loaded: ${images.length}`);
      console.log(`   Images in DOM: ${domImages.length}`);
      
      const totalImageSize = images.reduce((sum, img) => sum + parseInt(img.size || 0), 0);
      console.log(`   Total image size: ${(totalImageSize / 1024).toFixed(2)} KB`);
      
      // Check for optimization opportunities
      const largeImages = images.filter(img => parseInt(img.size || 0) > 500 * 1024); // >500KB
      if (largeImages.length > 0) {
        console.log('   🚨 Large images (>500KB):');
        largeImages.forEach(img => {
          console.log(`     - ${img.url.split('/').pop()}: ${(parseInt(img.size) / 1024).toFixed(2)} KB`);
        });
      }
      
      // Check for modern image formats
      const modernFormats = images.filter(img => 
        img.contentType.includes('webp') || img.contentType.includes('avif')
      );
      console.log(`   Modern formats (WebP/AVIF): ${modernFormats.length}/${images.length}`);
      
      // Check for missing alt text
      const missingAlt = domImages.filter(img => !img.alt || img.alt.trim() === '');
      if (missingAlt.length > 0) {
        console.log(`   ⚠️  Images missing alt text: ${missingAlt.length}`);
      }
      
      // Check for lazy loading
      const lazyImages = domImages.filter(img => img.loading === 'lazy');
      console.log(`   Lazy loaded images: ${lazyImages.length}/${domImages.length}`);
    });
  });

  // Runtime performance
  test.describe('Runtime Performance', () => {
    
    test('Animation performance', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Monitor frame rate during animations
      const frameData = await page.evaluate(() => {
        return new Promise((resolve) => {
          let frameCount = 0;
          let startTime = performance.now();
          const frames = [];
          
          function countFrame(timestamp) {
            frameCount++;
            frames.push(timestamp);
            
            if (frameCount < 120) { // Monitor for 2 seconds at 60fps
              requestAnimationFrame(countFrame);
            } else {
              const endTime = performance.now();
              const duration = endTime - startTime;
              const fps = frameCount / (duration / 1000);
              
              resolve({
                frameCount,
                duration,
                fps: fps.toFixed(2),
                frames: frames.slice(0, 10), // First 10 frame times
              });
            }
          }
          
          requestAnimationFrame(countFrame);
        });
      });
      
      console.log('🎬 ANIMATION PERFORMANCE:');
      console.log(`   Average FPS: ${frameData.fps}`);
      console.log(`   Total frames: ${frameData.frameCount} in ${frameData.duration.toFixed(2)}ms`);
      
      if (parseFloat(frameData.fps) < 55) {
        console.log('   ⚠️  Low frame rate detected - animations may appear janky');
      }
    });

    test('Memory usage analysis', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Get initial memory usage
      const initialMemory = await page.evaluate(() => {
        if (performance.memory) {
          return {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit,
          };
        }
        return null;
      });
      
      if (initialMemory) {
        console.log('💾 MEMORY USAGE:');
        console.log(`   Used JS Heap: ${(initialMemory.used / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Total JS Heap: ${(initialMemory.total / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   JS Heap Limit: ${(initialMemory.limit / 1024 / 1024).toFixed(2)} MB`);
        
        const memoryUsagePercent = (initialMemory.used / initialMemory.limit) * 100;
        if (memoryUsagePercent > 50) {
          console.log(`   ⚠️  High memory usage: ${memoryUsagePercent.toFixed(2)}% of limit`);
        }
      } else {
        console.log('💾 Memory API not available in this browser');
      }
    });

    test('Form interaction performance', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      const emailInput = page.locator('input[type="email"]').first();
      
      if (await emailInput.count() > 0) {
        // Measure input responsiveness
        const inputStartTime = Date.now();
        await emailInput.fill('test@example.com');
        const inputEndTime = Date.now();
        
        // Measure button click responsiveness
        const submitButton = page.locator('button[type="submit"]').first();
        if (await submitButton.count() > 0) {
          const clickStartTime = Date.now();
          await submitButton.click();
          const clickEndTime = Date.now();
          
          console.log('⌨️  FORM INTERACTION PERFORMANCE:');
          console.log(`   Input fill time: ${inputEndTime - inputStartTime}ms`);
          console.log(`   Button click response: ${clickEndTime - clickStartTime}ms`);
          
          if (inputEndTime - inputStartTime > 100) {
            console.log('   ⚠️  Slow input response detected');
          }
          
          if (clickEndTime - clickStartTime > 200) {
            console.log('   ⚠️  Slow button click response detected');
          }
        }
      }
    });
  });

  // Lighthouse-style audits
  test.describe('Web Vitals & Audits', () => {
    
    test('Core Web Vitals comprehensive', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      
      // Wait for all Core Web Vitals to be measured
      await page.waitForTimeout(5000);
      
      const webVitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {};
          
          // Get FCP
          const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
          if (fcpEntry) vitals.fcp = fcpEntry.startTime;
          
          // Get LCP
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          // Get CLS
          let clsValue = 0;
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            vitals.cls = clsValue;
          }).observe({ entryTypes: ['layout-shift'] });
          
          // Get FID (if available)
          new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            if (firstInput) {
              vitals.fid = firstInput.processingStart - firstInput.startTime;
            }
          }).observe({ entryTypes: ['first-input'] });
          
          setTimeout(() => resolve(vitals), 3000);
        });
      });
      
      console.log('📊 CORE WEB VITALS:');
      
      if (webVitals.fcp) {
        const fcpScore = webVitals.fcp <= 1800 ? 'GOOD' : webVitals.fcp <= 3000 ? 'NEEDS IMPROVEMENT' : 'POOR';
        console.log(`   FCP: ${webVitals.fcp.toFixed(2)}ms (${fcpScore})`);
      }
      
      if (webVitals.lcp) {
        const lcpScore = webVitals.lcp <= 2500 ? 'GOOD' : webVitals.lcp <= 4000 ? 'NEEDS IMPROVEMENT' : 'POOR';
        console.log(`   LCP: ${webVitals.lcp.toFixed(2)}ms (${lcpScore})`);
      }
      
      if (webVitals.cls !== undefined) {
        const clsScore = webVitals.cls <= 0.1 ? 'GOOD' : webVitals.cls <= 0.25 ? 'NEEDS IMPROVEMENT' : 'POOR';
        console.log(`   CLS: ${webVitals.cls.toFixed(3)} (${clsScore})`);
      }
      
      if (webVitals.fid !== undefined) {
        const fidScore = webVitals.fid <= 100 ? 'GOOD' : webVitals.fid <= 300 ? 'NEEDS IMPROVEMENT' : 'POOR';
        console.log(`   FID: ${webVitals.fid.toFixed(2)}ms (${fidScore})`);
      }
    });
  });
});