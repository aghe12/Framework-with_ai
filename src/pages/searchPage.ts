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

    async navigateToHome() {
        await this.wrapper.goto(`${process.env.BASEURL}`);
    }

    async searchFor(searchQuery: string) {
        const searchInputLocator = 'input[name="q"], input#search-field';
        const searchButtonLocator = 'button[type="submit"], button.search-bar__submit, summary.header__icon--search';

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
        const productItemsLocator = '.product, .grid__item, .product-item, .card, .product-card-wrapper';
        await this.assert.assertElementVisible(productItemsLocator);
        await this.assert.assertElementCountGreaterThan(productItemsLocator, 0);
    }

    async verifyNoResultsMessage() {
        const noResultsMessageLocator = ':text-matches("No results", "i"), :text-matches("No search performed", "i"), .empty-state, h2:has-text("No results")';
        await this.assert.assertElementVisible(noResultsMessageLocator);
    }

    async verifyUIHandlesInputGracefully() {
        const errorTitleLocator = 'text=/Application error|500 Internal Server Error/i';
        await this.assert.assertElementCount(errorTitleLocator, 0);
    }

    async verifySearchDoesNotBreak() {
        const errorTitleLocator = 'text=/Application error|500 Internal Server Error/i';
        await this.assert.assertElementCount(errorTitleLocator, 0);
        
        const productItemsLocator = '.product, .grid__item, .product-item, .card, .product-card-wrapper';
        const noResultsMessageLocator = ':text-matches("No results", "i"), :text-matches("No search performed", "i"), .empty-state, h2:has-text("No results")';
        
        const isItemsVisible = await this.page.waitForSelector(productItemsLocator, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        const isNoResultsVisible = await this.page.waitForSelector(noResultsMessageLocator, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        
        expect(isItemsVisible || isNoResultsVisible).toBe(true);
    }
}
