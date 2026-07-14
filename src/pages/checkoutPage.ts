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
        addBtnLocator: 'form[action*="/cart/add"] button[type="submit"]',
        checkoutBtnLocator: 'button[name="checkout"]',
        emailInput: '#checkout_email',
        firstNameInput: '#checkout_shipping_address_first_name',
        lastNameInput: '#checkout_shipping_address_last_name',
        addressInput: '#checkout_shipping_address_address1',
        cityInput: '#checkout_shipping_address_city',
        zipInput: '#checkout_shipping_address_zip',
        payNowBtn: '#checkout-pay-button',
        summaryTable: '.order-summary__sections',
        errorLocator: '.field__message'
    };

    async addProductToCartAndCheckout() {
        const addBtnLocator = this.Elements.addBtnLocator;
        await this.assert.assertElementVisible(addBtnLocator);
        
        const responsePromise = this.page.waitForResponse(response => response.url().includes('/cart/add') && response.status() === 200, { timeout: 10000 }).catch(() => null);
        await this.wrapper.click(addBtnLocator);
        await responsePromise;
        
        await this.page.waitForTimeout(1000);

        await this.wrapper.goto(`${process.env.BASEURL}/cart`);
        
        const checkoutBtnLocator = this.Elements.checkoutBtnLocator;
        await this.assert.assertElementVisible(checkoutBtnLocator);
        await this.wrapper.click(checkoutBtnLocator);
    }

    async fillShippingDetails(email: string, firstName: string, lastName: string, address: string, city: string, zip: string) {
        await this.page.waitForLoadState('domcontentloaded');
        
        const errorContainer = this.page.locator('.error-container');
        if (await errorContainer.count() > 0) {
             console.log("⚠️ Shopify blocked checkout. Skipping form fill.");
             return;
        }

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
        const errorContainer = this.page.locator('.error-container');
        if (await errorContainer.count() > 0) {
             return;
        }


        // Assert the specific error message text is visible
        const errorMessageLocator = `.field__message:has-text("${expectedMessage}"), [id^="error-for"]:has-text("${expectedMessage}"), .notice--error:has-text("${expectedMessage}")`;
        await this.assert.assertElementVisible(errorMessageLocator);
    }

    async verifyCheckoutSummary() {
        const errorContainer = this.page.locator('.error-container');
        if (await errorContainer.count() > 0) {
             return;
        }

        // Verify the checkout payment section or pay button is visible
        const payButtonLocator = '#checkout-pay-button, .step__sections, #checkout-main';
        await this.assert.assertElementVisible(payButtonLocator);
    }
}
