import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I am on the Shopify storefront homepage', async function () {
    await fixture.pages.searchPage.navigateToHome();
});

When('I search for {string}', async function (searchQuery: string) {
    await fixture.pages.searchPage.searchFor(searchQuery);
});

When('I search with empty whitespace {string}', async function (searchQuery: string) {
    await fixture.pages.searchPage.searchFor(searchQuery);
});

Then('I should see product results', async function () {
    await fixture.pages.searchPage.verifyProductResults();
});

Then('I should see a no results message', async function () {
    await fixture.pages.searchPage.verifyNoResultsMessage();
});

Then('the search UI should handle the input gracefully', async function () {
    await fixture.pages.searchPage.verifyUIHandlesInputGracefully();
});

Then('I should see the search does not break and shows appropriate feedback', async function () {
    await fixture.pages.searchPage.verifySearchDoesNotBreak();
});
