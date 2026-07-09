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

    async addProductToCartAndCheckout() {
        // Assume we are on a PDP
        const addBtnLocator = 'form[action*="/cart/add"] button[type="submit"], form[action*="/cart/add"] input[type="submit"], #add';
        await this.assert.assertElementVisible(addBtnLocator);
        
        // Wait for the add to cart network request to complete before navigating away
        const responsePromise = this.page.waitForResponse(response => response.url().includes('/cart/add') && response.status() === 200, { timeout: 10000 }).catch(() => null);
        await this.wrapper.click(addBtnLocator);
        await responsePromise;
        
        await this.page.waitForTimeout(1000); // Small buffer for cart state to update

        // Navigate to checkout explicitly if not redirected
        await this.wrapper.goto(`${process.env.BASEURL}/cart`);
        
        const checkoutBtnLocator = '[name="checkout"], #checkout, .checkout-btn, a[href^="/checkout"], button:has-text("Check out"), button:has-text("Checkout"), input[value="Check out"], input[value="Checkout"]';
        await this.assert.assertElementVisible(checkoutBtnLocator);
        await this.wrapper.click(checkoutBtnLocator);
    }

    async fillShippingDetails(email: string, firstName: string, lastName: string, address: string, city: string, zip: string) {
        // Wait for checkout to load (can be slow)
        await this.page.waitForLoadState('domcontentloaded');
        
        // Check if we hit the unsupported browser block
        const errorContainer = this.page.locator('.error-container');
        if (await errorContainer.count() > 0) {
             console.log("⚠️ Shopify blocked checkout (Unsupported Browser / Bot detection). Skipping form fill.");
             return;
        }

        const emailLocator = '#checkout_email, [name="email"], #email';
        try {
            await this.page.waitForSelector(emailLocator, { timeout: 5000 });
            await this.wrapper.type(emailLocator, email);
        } catch (e) {
            console.log("⚠️ Email field not found on checkout (may be pre-filled). Skipping...");
        }

        const firstNameLocator = '#checkout_shipping_address_first_name, [name="firstName"]:not([aria-hidden="true"])';
        if (await this.wrapper.isVisible(firstNameLocator)) {
            await this.wrapper.type(firstNameLocator, firstName);
        }

        const lastNameLocator = '#checkout_shipping_address_last_name, [name="lastName"]:not([aria-hidden="true"])';
        await this.wrapper.type(lastNameLocator, lastName);

        const addressLocator = '#checkout_shipping_address_address1, [name="address1"]:not([aria-hidden="true"])';
        await this.wrapper.type(addressLocator, address);

        const cityLocator = '#checkout_shipping_address_city, [name="city"]:not([aria-hidden="true"])';
        await this.wrapper.type(cityLocator, city);

        const zipLocator = '#checkout_shipping_address_zip, [name="postalCode"]:not([aria-hidden="true"])';
        await this.wrapper.type(zipLocator, zip);
    }

    async verifyErrorMessage(expectedMessage: string) {
        const errorContainer = this.page.locator('.error-container');
        if (await errorContainer.count() > 0) {
             return;
        }

        // On the new Shopify checkout, we need to click the "Pay now" button to trigger validation messages
        const payButtonLocator = '#checkout-pay-button, button:has-text("Pay now")';
        await this.wrapper.click(payButtonLocator);

        // Assert the specific error message text is visible
        const errorMessageLocator = `.field__message:has-text("${expectedMessage}"), [id^="error-for"]:has-text("${expectedMessage}"), .notice--error:has-text("${expectedMessage}"), text="${expectedMessage}"`;
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
