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
        const addBtnLocator = this.Elements.addBtnLocator;
        await this.assert.assertElementVisible(addBtnLocator);
        const responsePromise = this.page.waitForResponse(response => response.url().includes('/cart/add') && response.status() === 200, { timeout: 10000 }).catch(() => null);
        await this.wrapper.click(addBtnLocator);
        await responsePromise;
        await this.page.waitForTimeout(1000);
    }

    async navigateToCart() {
        await this.wrapper.goto(`${process.env.BASEURL}/cart`);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async updateQuantity(quantity: string) {
        const qtyInput = this.page.locator(this.Elements.qtyInput).first();
        await expect(qtyInput).toBeVisible();
        await qtyInput.fill(quantity);
        await qtyInput.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000); // Allow for UI update
    }

    async verifyQuantityUpdated(quantity: string) {
        const qtyInput = this.page.locator(this.Elements.qtyInput).first();
        await expect(qtyInput).toHaveValue(quantity);
        const totalPrice = this.page.locator(this.Elements.totalPrice);
        if (await totalPrice.count() > 0) {
            await expect(totalPrice.first()).toBeVisible();
        }
    }

    async removeFirstItem() {
        const removeLink = this.page.locator(this.Elements.removeLink).first();
        await expect(removeLink).toBeVisible();
        await removeLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyCartEmpty() {
        const emptyMsg = this.page.locator(this.Elements.emptyMsg);
        await expect(emptyMsg.first()).toBeVisible({ timeout: 10000 });
    }

    async verifyItemInCart() {
        const cartItems = this.page.locator(this.Elements.cartItems);
        expect(await cartItems.count()).toBeGreaterThan(0);
    }
}
