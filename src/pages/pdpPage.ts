import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import Assert from "../helper/wrapper/Assert";

export default class PdpPage {
    private wrapper: PlaywrightWrapper;
    private assert: Assert;

    constructor(private page: Page) {
        this.wrapper = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    async navigateToCatalog() {
        await this.wrapper.goto(`${process.env.BASEURL}/collections/all`);
    }

    async clickFirstProduct() {
        const productLinkLocator = 'a[href*="/products/"]';
        await this.assert.assertElementVisible(productLinkLocator);
        await this.wrapper.click(productLinkLocator);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyPDPDetails() {
        // Wait a moment for page transition before asserting
        await this.page.waitForLoadState('domcontentloaded');

        // Verify Title is present by finding an H1 that actually has text
        const titleLocator = this.page.locator('h1').filter({ hasText: /[a-zA-Z0-9]/ });
        await expect(titleLocator.first()).toBeVisible({ timeout: 10000 });
        const titleText = await titleLocator.first().innerText();
        expect(titleText.trim().length).toBeGreaterThan(0);

        // Verify Price is present
        const priceLocator = this.page.locator('.price, .money, .price-item, .product__price, .product-single__price, .product-price, #product-price, [itemprop="price"]').filter({ hasText: /[$£€\d]/ });
        await expect(priceLocator.first()).toBeVisible({ timeout: 10000 });
        const priceText = await priceLocator.first().innerText();
        expect(priceText).toMatch(/[$£€\d]/);

        // Verify Image is present
        const imageLocator = 'img';
        const imagesCount = await this.wrapper.count(imageLocator);
        expect(imagesCount).toBeGreaterThan(0);

        // Verify Variant Selectors or Add to Cart form
        const productFormLocator = 'form[action*="/cart/add"]';
        await this.assert.assertElementVisible(productFormLocator);
    }
}
