import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import Assert from "../helper/wrapper/Assert";

export default class HomePage {
    private wrapper: PlaywrightWrapper;
    private assert: Assert;

    constructor(private page: Page) {
        this.wrapper = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    async navigateToHome() {
        await this.wrapper.goto(`${process.env.BASEURL}/`);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifySocialLink(platform: string, expectedUrl: string) {
        // The HTML structure has class names matching the platforms like 'facebook', 'twitter'
        const linkLocator = this.page.locator(`#social a.${platform.toLowerCase()}`);
        await expect(linkLocator).toBeVisible();
        
        const actualHref = await linkLocator.getAttribute('href');
        expect(actualHref).toContain(expectedUrl);
    }
}
