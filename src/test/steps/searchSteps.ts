import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I am on the Shopify storefront homepage', async function () {
    fixture.logger.info("Navigating to the Shopify storefront homepage");
    await fixture.subStepLogger.info("Navigating to the Shopify storefront homepage");
    await fixture.pages.searchPage.navigateToHome();
    await fixture.subStepLogger.success("Navigation to the Shopify storefront homepage complete");
});

When('I search for {string}', async function (searchQuery: string) {
    fixture.logger.info(`Searching for product: ${searchQuery}`);
    await fixture.subStepLogger.info(`Searching for product: ${searchQuery}`);
    await fixture.pages.searchPage.searchFor(searchQuery);
    await fixture.subStepLogger.success(`Searching for product: ${searchQuery} complete`);
});

When('I search with empty whitespace {string}', async function (searchQuery: string) {
    fixture.logger.info(`Searching with empty whitespace: '${searchQuery}'`);
    await fixture.subStepLogger.info(`Searching with empty whitespace: '${searchQuery}'`);
    await fixture.pages.searchPage.searchFor(searchQuery);
    await fixture.subStepLogger.success(`Searching with empty whitespace: '${searchQuery}' complete`);
});

Then('I should see product results', async function () {
    fixture.logger.info("Verifying product results are displayed");
    await fixture.subStepLogger.info("Verifying product results are displayed");
    await fixture.pages.searchPage.verifyProductResults();
    await fixture.subStepLogger.success("Verified product results are displayed");
});

Then('I should see a no results message', async function () {
    fixture.logger.info("Verifying no results message is displayed");
    await fixture.subStepLogger.info("Verifying no results message is displayed");
    await fixture.pages.searchPage.verifyNoResultsMessage();
    await fixture.subStepLogger.success("Verified no results message is displayed");
});

Then('the search UI should handle the input gracefully', async function () {
    fixture.logger.info("Verifying the search UI handles input gracefully");
    await fixture.subStepLogger.info("Verifying the search UI handles input gracefully");
    await fixture.pages.searchPage.verifyUIHandlesInputGracefully();
    await fixture.subStepLogger.success("Verified the search UI handles input gracefully");
});

Then('I should see the search does not break and shows appropriate feedback', async function () {
    fixture.logger.info("Verifying the search does not break and shows feedback");
    await fixture.subStepLogger.info("Verifying the search does not break and shows feedback");
    await fixture.pages.searchPage.verifySearchDoesNotBreak();
    await fixture.subStepLogger.success("Verified the search does not break and shows feedback");
});
