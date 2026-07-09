import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

When('I add the product to the cart and proceed to checkout', async function () {
    await fixture.pages.checkoutPage.addProductToCartAndCheckout();
});

When('I enter shipping details with email {string}, firstName {string}, lastName {string}, address {string}, city {string}, and zip {string}', async function (email: string, firstName: string, lastName: string, address: string, city: string, zip: string) {
    await fixture.pages.checkoutPage.fillShippingDetails(email, firstName, lastName, address, city, zip);
});

Then('the checkout page should load successfully with the correct products', async function () {
    await fixture.pages.checkoutPage.verifyCheckoutSummary();
});

Then('I should see a checkout error message {string}', async function (expectedMessage: string) {
    await fixture.pages.checkoutPage.verifyErrorMessage(expectedMessage);
});
