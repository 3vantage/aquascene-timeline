const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Attempting to load http://localhost:3000...');
    
    // Try to navigate to the page with a timeout
    const response = await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Response status:', response.status());
    
    if (response.status() === 200 || response.status() === 307) {
      // Check for the main content
      const title = await page.title();
      console.log('Page title:', title);
      
      // Try to find key elements
      const hasHeroSection = await page.locator('text=/Dream Aquascape/i').count() > 0;
      const hasWaitlistForm = await page.locator('button:has-text("Join Waitlist"), button:has-text("Get Early Access")').count() > 0;
      
      console.log('Has hero section:', hasHeroSection);
      console.log('Has waitlist form:', hasWaitlistForm);
      
      // Take a screenshot for verification
      await page.screenshot({ path: 'app-verification.png', fullPage: false });
      console.log('Screenshot saved as app-verification.png');
      
      if (hasHeroSection || hasWaitlistForm || title.includes('Aquascape') || title.includes('3vantage')) {
        console.log('✅ SUCCESS: Application is running correctly at http://localhost:3000');
      } else {
        console.log('⚠️  WARNING: Page loaded but content might be missing');
      }
    } else {
      console.log('❌ ERROR: Page returned status', response.status());
    }
    
  } catch (error) {
    console.log('❌ ERROR: Failed to load the application');
    console.log('Error details:', error.message);
    
    // Try to get more information
    try {
      const response = await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 5000 
      });
      const content = await page.content();
      console.log('Page content preview:', content.substring(0, 500));
    } catch (e) {
      console.log('Could not retrieve page content');
    }
  }
  
  await browser.close();
})();