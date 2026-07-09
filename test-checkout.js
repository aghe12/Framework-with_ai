const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Navigating to product page...");
    await page.goto('https://sauce-demo.myshopify.com/products/grey-jacket', { waitUntil: 'domcontentloaded' });
    
    console.log("Adding to cart...");
    const addBtn = page.locator('form[action*="/cart/add"] button[type="submit"], form[action*="/cart/add"] input[type="submit"], #add');
    await addBtn.first().click();
    
    console.log("Waiting for cart navigation...");
    await page.waitForTimeout(3000);
    // Sometimes it stays on page, sometimes goes to /cart
    await page.goto('https://sauce-demo.myshopify.com/cart', { waitUntil: 'domcontentloaded' });
    
    console.log("Clicking checkout...");
    const checkoutBtn = page.locator('[name="checkout"], .checkout-btn');
    await checkoutBtn.first().click();
    
    console.log("Waiting for checkout page...");
    await page.waitForTimeout(5000);
    
    const dom = await page.content();
    fs.writeFileSync('checkout_dom.txt', dom);
    console.log("DOM saved to checkout_dom.txt");

    await browser.close();
})();
