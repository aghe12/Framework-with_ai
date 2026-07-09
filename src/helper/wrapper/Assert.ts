import { expect, Page } from "@playwright/test";

export default class Assert {
    constructor(private page: Page) {}

    async assertTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(title: string) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(title);
    }

    async assertElementVisible(locator: string) {
        await expect(this.page.locator(locator).first()).toBeVisible({ timeout: 10000 });
    }

    async assertElementHidden(locator: string) {
        await expect(this.page.locator(locator).first()).toBeHidden({ timeout: 10000 });
    }

    async assertElementCount(locator: string, count: number) {
        await expect(this.page.locator(locator)).toHaveCount(count);
    }

    async assertElementCountGreaterThan(locator: string, count: number) {
        const elementsCount = await this.page.locator(locator).count();
        expect(elementsCount).toBeGreaterThan(count);
    }
}
