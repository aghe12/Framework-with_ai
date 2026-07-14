import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

When('I add the product to the cart', async function () {
    fixture.logger.info("Adding the product to the cart");
    await fixture.subStepLogger.info("Adding the product to the cart");
    await fixture.pages.cartPage.addProductToCart();
    await fixture.subStepLogger.success("Adding the product to the cart complete");
});

When('I navigate to the cart page', async function () {
    fixture.logger.info("Navigating to the cart page");
    await fixture.subStepLogger.info("Navigating to the cart page");
    await fixture.pages.cartPage.navigateToCart();
    await fixture.subStepLogger.success("Navigation to the cart page complete");
});

When('I update the quantity to {string}', async function (quantity: string) {
    fixture.logger.info(`Updating the quantity to: ${quantity}`);
    await fixture.subStepLogger.info(`Updating the quantity to: ${quantity}`);
    await fixture.pages.cartPage.updateQuantity(quantity);
    await fixture.subStepLogger.success(`Updating the quantity to: ${quantity} complete`);
});

Then('the cart should update the quantity to {string}', async function (quantity: string) {
    fixture.logger.info(`Verifying cart updated quantity to: ${quantity}`);
    await fixture.subStepLogger.info(`Verifying cart updated quantity to: ${quantity}`);
    await fixture.pages.cartPage.verifyQuantityUpdated(quantity);
    await fixture.subStepLogger.success(`Verified cart updated quantity to: ${quantity}`);
});

When('I remove the item from the cart', async function () {
    fixture.logger.info("Removing the item from the cart");
    await fixture.subStepLogger.info("Removing the item from the cart");
    await fixture.pages.cartPage.removeFirstItem();
    await fixture.subStepLogger.success("Removing the item from the cart complete");
});

Then('I should see the cart is empty message', async function () {
    fixture.logger.info("Verifying cart is empty message");
    await fixture.subStepLogger.info("Verifying cart is empty message");
    await fixture.pages.cartPage.verifyCartEmpty();
    await fixture.subStepLogger.success("Verified cart is empty message");
});

Then('I should see the item still in my cart', async function () {
    fixture.logger.info("Verifying item is still in cart");
    await fixture.subStepLogger.info("Verifying item is still in cart");
    await fixture.pages.cartPage.verifyItemInCart();
    await fixture.subStepLogger.success("Verified item is still in cart");
});
