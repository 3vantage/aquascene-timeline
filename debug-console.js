const puppeteer = require('puppeteer');

async function debugConsole() {
  const browser = await puppeteer.launch({ 
    headless: false, 
    devtools: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    console.log(`BROWSER CONSOLE [${msg.type()}]:`, msg.text());
  });
  
  // Capture JavaScript errors
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });
  
  // Capture failed requests
  page.on('requestfailed', request => {
    console.log('FAILED REQUEST:', request.url(), request.failure().errorText);
  });
  
  try {
    console.log('Navigating to http://localhost:3001...');
    await page.goto('http://localhost:3001', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('Page loaded, waiting for content...');
    
    // Wait a bit to capture any delayed console messages
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if the page has any visible content
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Page content length:', bodyText.length);
    console.log('First 500 characters:', bodyText.substring(0, 500));
    
    // Check for specific elements that should be present
    const timelineExists = await page.$('.timeline-container, [class*="timeline"], [data-testid*="timeline"]') !== null;
    console.log('Timeline container found:', timelineExists);
    
    // Check for error boundaries or error messages
    const errorElements = await page.$$eval('*', elements => 
      elements.filter(el => 
        el.textContent.toLowerCase().includes('error') || 
        el.textContent.toLowerCase().includes('failed') ||
        el.textContent.toLowerCase().includes('not found')
      ).map(el => ({
        tagName: el.tagName,
        className: el.className,
        text: el.textContent.substring(0, 100)
      }))
    );
    
    if (errorElements.length > 0) {
      console.log('Error elements found:', errorElements);
    }
    
  } catch (error) {
    console.error('Navigation error:', error);
  }
  
  console.log('Debug complete. Browser left open for manual inspection.');
  // Don't close browser automatically so we can inspect
  // await browser.close();
}

debugConsole().catch(console.error);