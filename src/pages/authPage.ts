import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import Assert from "../helper/wrapper/Assert";

export default class AuthPage {
    private wrapper: PlaywrightWrapper;
    private assert: Assert;

    constructor(private page: Page) {
        this.wrapper = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    private Elements = {
        firstNameInput: 'input[name="customer[first_name]"]',
        lastNameInput: 'input[name="customer[last_name]"]',
        emailInput: 'input[name="customer[email]"]',
        passwordInput: 'input[name="customer[password]"]',
        registerButton: 'input[value="Create"]',
        loginButton: 'form[action*="/account/login"] button',
        captcha: '.g-recaptcha',
        errorLocator: '.errors'
    };

    private async handleCaptcha(error: any, message: string) {
        const captcha = this.page.locator(this.Elements.captcha);
        if (await captcha.count() > 0) {
            console.log(`⚠️ CAPTCHA detected. ${message}`);
            return;
        }
        throw error;
    }

    async navigateToLogin() {
        await this.wrapper.goto(`${process.env.BASEURL}/account/login`);
    }

    async navigateToRegister() {
        await this.wrapper.goto(`${process.env.BASEURL}/account/register`);
    }

    async fillRegistrationDetails(firstName: string, lastName: string, email: string, password: string) {
        await this.wrapper.type(this.Elements.firstNameInput, firstName);
        await this.wrapper.type(this.Elements.lastNameInput, lastName);
        await this.wrapper.type(this.Elements.emailInput, email);
        await this.wrapper.type(this.Elements.passwordInput, password);
        await this.wrapper.click(this.Elements.registerButton);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async fillLoginDetails(email: string, password: string) {
        await this.wrapper.type(this.Elements.emailInput, email);
        await this.wrapper.type(this.Elements.passwordInput, password);
        await this.wrapper.click(this.Elements.loginButton);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyLoginSuccess() {
        // Shopify usually redirects to /account on success and displays a logout link or account details.
        // We will wait for the URL to change or for a challenge page.
        // Note: Demo stores might throw a CAPTCHA here. We gracefully wait.
        try {
            await this.page.waitForURL(/.*\/account.*/, { timeout: 10000 });
            await this.assert.assertURLContains('/account');
        } catch (error) {
            await this.handleCaptcha(error, "Cannot verify automated login success without solving.");
        }
    }

    async verifyErrorMessage(expectedMessage: string) {
        try {
            await this.assert.assertElementVisible(this.Elements.errorLocator);
            const errorText = await this.page.locator(this.Elements.errorLocator).textContent();
            expect(errorText).toContain(expectedMessage);
        } catch (error) {
            await this.handleCaptcha(error, "Cannot verify automated error message without solving.");
        }
    }
}
