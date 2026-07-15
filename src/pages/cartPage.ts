import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import Assert from "../helper/wrapper/Assert";

export default class CartPage {
    private wrapper: PlaywrightWrapper;
    private assert: Assert;

    constructor(private page: Page) {
        this.wrapper = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    private Elements = {
        addBtnLocator: 'form[action*="/cart/add"] button[type="submit"]',
        qtyInput: 'input[name="updates[]"]',
        totalPrice: '.cart-total',
        removeLink: 'a:has-text("Remove")',
        emptyMsg: 'text="Your cart is currently empty"',
        cartItems: '.cart-item'
    };

    async addProductToCart() {
        await this.assert.assertElementVisible(this.Elements.addBtnLocator);
        const responsePromise = this.page.waitForResponse(response => response.url().includes('/cart/add') && response.status() === 200, { timeout: 10000 }).catch(() => null);
        await this.wrapper.click(this.Elements.addBtnLocator);
        await responsePromise;
        await this.page.waitForTimeout(1000);
    }

    async navigateToCart() {
        await this.wrapper.goto(`${process.env.BASEURL}/cart`);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async updateQuantity(quantity: string) {
        await expect(this.page.locator(this.Elements.qtyInput).first()).toBeVisible({ timeout: 10000 });
        await this.page.locator(this.Elements.qtyInput).first().fill('');
        await this.page.locator(this.Elements.qtyInput).first().type(quantity);
        await this.page.locator(this.Elements.qtyInput).first().press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000); // Allow for UI update
    }

    async verifyQuantityUpdated(expectedQuantity: string) {
        await expect(this.page.locator(this.Elements.qtyInput).first()).toHaveValue(expectedQuantity, { timeout: 10000 });
        if (await this.page.locator(this.Elements.totalPrice).count() > 0) {
            const priceText = await this.page.locator(this.Elements.totalPrice).first().innerText();
            expect(priceText.length).toBeGreaterThan(0);
        }
    }

    async removeFirstItem() {
        await expect(this.page.locator(this.Elements.removeLink).first()).toBeVisible();
        await this.page.locator(this.Elements.removeLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyCartEmpty() {
        await expect(this.page.locator(this.Elements.emptyMsg)).toBeVisible({ timeout: 10000 });
    }

    async verifyItemInCart() {
        const count = await this.page.locator(this.Elements.cartItems).count();
        expect(count).toBeGreaterThan(0);
    }
}
