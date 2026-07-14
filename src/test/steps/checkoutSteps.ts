import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

When('I add the product to the cart and proceed to checkout', async function () {
    fixture.logger.info("Adding the product to the cart and proceeding to checkout");
    await fixture.subStepLogger.info("Adding the product to the cart and proceeding to checkout");
    await fixture.pages.checkoutPage.addProductToCartAndCheckout();
    await fixture.subStepLogger.success("Adding the product to the cart and proceeding to checkout complete");
});

When('I enter shipping details with email {string}, firstName {string}, lastName {string}, address {string}, city {string}, and zip {string}', async function (email: string, firstName: string, lastName: string, address: string, city: string, zip: string) {
    fixture.logger.info(`Entering shipping details for email: ${email}`);
    await fixture.subStepLogger.info(`Entering shipping details for email: ${email}`);
    await fixture.pages.checkoutPage.fillShippingDetails(email, firstName, lastName, address, city, zip);
    await fixture.subStepLogger.success(`Entering shipping details for email: ${email} complete`);
});

Then('the checkout page should load successfully with the correct products', async function () {
    fixture.logger.info("Verifying checkout summary");
    await fixture.subStepLogger.info("Verifying checkout summary");
    await fixture.pages.checkoutPage.verifyCheckoutSummary();
    await fixture.subStepLogger.success("Verified checkout summary");
});

Then('I should see a checkout error message {string}', async function (expectedMessage: string) {
    fixture.logger.info(`Verifying checkout error message: ${expectedMessage}`);
    await fixture.subStepLogger.info(`Verifying checkout error message: ${expectedMessage}`);
    await fixture.pages.checkoutPage.verifyErrorMessage(expectedMessage);
    await fixture.subStepLogger.success(`Verified checkout error message: ${expectedMessage}`);
});
