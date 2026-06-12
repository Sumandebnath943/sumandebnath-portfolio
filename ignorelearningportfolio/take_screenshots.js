const puppeteer = require('puppeteer');
const path = require('path');

const url = `file:///${path.join(__dirname, 'index.html').replace(/\\/g, '/')}`;
const outputDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\2e63eaf6-334a-41bf-9238-c9dce0576552';

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    
    // Set a typical desktop viewport
    await page.setViewport({ width: 1440, height: 900 });

    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Ensure all images/pdfs are loaded by waiting a bit
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Screenshot Hero
    console.log('Taking screenshot of Hero section...');
    const hero = await page.$('.hero');
    if (hero) {
        await hero.screenshot({ path: path.join(outputDir, 'before_hero.png') });
    }

    // Screenshot Featured Experiences
    console.log('Taking screenshot of Featured section...');
    const featured = await page.$('#featured');
    if (featured) {
        await featured.screenshot({ path: path.join(outputDir, 'before_featured.png') });
    }

    // Screenshot Learning Portfolio
    console.log('Taking screenshot of Portfolio section...');
    const portfolio = await page.$('#portfolio');
    if (portfolio) {
        await portfolio.screenshot({ path: path.join(outputDir, 'before_portfolio.png') });
    }

    console.log('Screenshots complete.');
    await browser.close();
})();
