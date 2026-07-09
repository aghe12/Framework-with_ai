import { Page } from "@playwright/test";

export default class PlaywrightWrapper {
    constructor(private page: Page) {}

    async goto(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async click(locator: string) {
        await this.page.locator(locator).first().click();
    }

    async type(locator: string, text: string) {
        await this.page.locator(locator).first().fill(text);
    }

    async press(locator: string, key: string) {
        await this.page.locator(locator).first().press(key);
    }

    async isVisible(locator: string): Promise<boolean> {
        return await this.page.locator(locator).first().isVisible();
    }

    async count(locator: string): Promise<number> {
        return await this.page.locator(locator).count();
    }
}
