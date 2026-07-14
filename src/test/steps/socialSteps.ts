import { Given, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I navigate to the Home page', async function () {
    fixture.logger.info("Navigating to the Home page");
    await fixture.subStepLogger.info("Navigating to the Home page");
    await fixture.pages.homePage.navigateToHome();
    await fixture.subStepLogger.success("Navigation to the Home page complete");
});

Then('I should see the {string} social link pointing to {string}', async function (platform: string, expectedUrl: string) {
    fixture.logger.info(`Verifying ${platform} social link points to ${expectedUrl}`);
    await fixture.subStepLogger.info(`Verifying ${platform} social link points to ${expectedUrl}`);
    await fixture.pages.homePage.verifySocialLink(platform, expectedUrl);
    await fixture.subStepLogger.success(`Verified ${platform} social link points to ${expectedUrl}`);
});
