import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import Assert from "../helper/wrapper/Assert";

export default class SearchPage {
    private wrapper: PlaywrightWrapper;
    private assert: Assert;

    constructor(private page: Page, private subStepLogger?: any) {
        this.wrapper = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    private Elements = {
        searchInput: 'input[name="q"]',
        searchButton: 'button[type="submit"]',
        productItems: '.grid__item',
        noResultsMessage: 'text=/no results/i',
        errorTitle: 'text=/Application error|500 Internal Server Error/i'
    };

    async navigateToHome() {
        await this.wrapper.goto(`${process.env.BASEURL}`);
    }

    async searchFor(searchQuery: string) {

        const searchButtonVisible = await this.wrapper.isVisible(this.Elements.searchButton);
        const searchInputVisible = await this.wrapper.isVisible(this.Elements.searchInput);

        if (searchButtonVisible && !searchInputVisible) {
            await this.wrapper.click(this.Elements.searchButton);
        }

        await this.wrapper.type(this.Elements.searchInput, searchQuery);
        await this.wrapper.press(this.Elements.searchInput, 'Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyProductResults() {
        await this.assert.assertElementVisible(this.Elements.productItems);
        await this.assert.assertElementCountGreaterThan(this.Elements.productItems, 0);
    }

    async verifyNoResultsMessage() {
        await this.assert.assertElementVisible(this.Elements.noResultsMessage);
    }

    async verifyUIHandlesInputGracefully() {
        await this.assert.assertElementCount(this.Elements.errorTitle, 0);
    }

    async verifySearchDoesNotBreak() {
        await this.assert.assertElementCount(this.Elements.errorTitle, 0);
        
        
        const isItemsVisible = await this.page.waitForSelector(this.Elements.productItems, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        const isNoResultsVisible = await this.page.waitForSelector(this.Elements.noResultsMessage, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        
        expect(isItemsVisible || isNoResultsVisible).toBe(true);
    }
}
