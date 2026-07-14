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
        const searchInputLocator = this.Elements.searchInput;
        const searchButtonLocator = this.Elements.searchButton;

        const searchButtonVisible = await this.wrapper.isVisible(searchButtonLocator);
        const searchInputVisible = await this.wrapper.isVisible(searchInputLocator);

        if (searchButtonVisible && !searchInputVisible) {
            await this.wrapper.click(searchButtonLocator);
        }

        await this.wrapper.type(searchInputLocator, searchQuery);
        await this.wrapper.press(searchInputLocator, 'Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyProductResults() {
        const productItemsLocator = this.Elements.productItems;
        await this.assert.assertElementVisible(productItemsLocator);
        await this.assert.assertElementCountGreaterThan(productItemsLocator, 0);
    }

    async verifyNoResultsMessage() {
        const noResultsMessageLocator = this.Elements.noResultsMessage;
        await this.assert.assertElementVisible(noResultsMessageLocator);
    }

    async verifyUIHandlesInputGracefully() {
        const errorTitleLocator = this.Elements.errorTitle;
        await this.assert.assertElementCount(errorTitleLocator, 0);
    }

    async verifySearchDoesNotBreak() {
        const errorTitleLocator = this.Elements.errorTitle;
        await this.assert.assertElementCount(errorTitleLocator, 0);
        
        const productItemsLocator = this.Elements.productItems;
        const noResultsMessageLocator = this.Elements.noResultsMessage;
        
        const isItemsVisible = await this.page.waitForSelector(productItemsLocator, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        const isNoResultsVisible = await this.page.waitForSelector(noResultsMessageLocator, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        
        expect(isItemsVisible || isNoResultsVisible).toBe(true);
    }
}
