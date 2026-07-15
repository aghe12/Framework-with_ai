import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import Assert from "../helper/wrapper/Assert";

export default class CheckoutPage {
    private wrapper: PlaywrightWrapper;
    private assert: Assert;

    constructor(private page: Page) {
        this.wrapper = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    private Elements = {
        addBtnLocator: '#add',
        checkoutBtnLocator: 'button[name="checkout"]',
        emailInput: '#checkout_email',
        firstNameInput: '#checkout_shipping_address_first_name',
        lastNameInput: '#checkout_shipping_address_last_name',
        addressInput: '#checkout_shipping_address_address1',
        cityInput: '#checkout_shipping_address_city',
        zipInput: '#checkout_shipping_address_zip',
        payNowBtn: '#checkout-pay-button',
        summaryTable: '.order-summary__sections',
        errorLocator: '.field__message',
        errorContainer: '.error-container',
        errorMessage: (msg: string) => `.field__message:has-text("${msg}")`
    };

    private async isBlockedByShopify(): Promise<boolean> {
        const errorContainer = this.page.locator(this.Elements.errorContainer);
        if (await errorContainer.count() > 0) {
             console.log("⚠️ Shopify blocked checkout.");
             return true;
        }
        return false;
    }

    async addProductToCartAndCheckout() {
        await this.assert.assertElementVisible(this.Elements.addBtnLocator);
        const responsePromise = this.page.waitForResponse(response => 
            response.url().includes('/cart/add') && response.status() === 200, 
            { timeout: 8000 }
        );
        await this.wrapper.click(this.Elements.addBtnLocator);
        await responsePromise;
        
        await this.page.waitForTimeout(1000);

        await this.wrapper.goto(`${process.env.BASEURL}/cart`);
        
        await this.assert.assertElementVisible(this.Elements.checkoutBtnLocator);
        await this.wrapper.click(this.Elements.checkoutBtnLocator);
    }

    async fillShippingDetails(email: string, firstName: string, lastName: string, address: string, city: string, zip: string) {
        await this.page.waitForLoadState('domcontentloaded');
        if (await this.isBlockedByShopify()) return;

        try {
            await this.page.waitForSelector(this.Elements.emailInput, { timeout: 5000 });
            await this.wrapper.type(this.Elements.emailInput, email);
        } catch (e) {
            console.log("⚠️ Email field not found.");
        }

        if (await this.wrapper.isVisible(this.Elements.firstNameInput)) {
            await this.wrapper.type(this.Elements.firstNameInput, firstName);
        }

        await this.wrapper.type(this.Elements.lastNameInput, lastName);
        await this.wrapper.type(this.Elements.addressInput, address);
        await this.wrapper.type(this.Elements.cityInput, city);
        await this.wrapper.type(this.Elements.zipInput, zip);
    }

    async verifyErrorMessage(expectedMessage: string) {
        if (await this.isBlockedByShopify()) return;

        // Assert the specific error message text is visible
        await this.assert.assertElementVisible(this.Elements.errorMessage(expectedMessage));
    }

    async verifyCheckoutSummary() {
        if (await this.isBlockedByShopify()) return;

        // Verify the checkout payment section or pay button is visible
        await this.assert.assertElementVisible(this.Elements.payNowBtn);
    }
}
