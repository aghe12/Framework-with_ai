import { Given, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I navigate to the Home page', async function () {
    await fixture.pages.homePage.navigateToHome();
});

Then('I should see the {string} social link pointing to {string}', async function (platform: string, expectedUrl: string) {
    await fixture.pages.homePage.verifySocialLink(platform, expectedUrl);
});
