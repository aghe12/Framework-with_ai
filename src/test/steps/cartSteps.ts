import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

When('I add the product to the cart', async function () {
    await fixture.pages.cartPage.addProductToCart();
});

When('I navigate to the cart page', async function () {
    await fixture.pages.cartPage.navigateToCart();
});

When('I update the quantity to {string}', async function (quantity: string) {
    await fixture.pages.cartPage.updateQuantity(quantity);
});

Then('the cart should update the quantity to {string}', async function (quantity: string) {
    await fixture.pages.cartPage.verifyQuantityUpdated(quantity);
});

When('I remove the item from the cart', async function () {
    await fixture.pages.cartPage.removeFirstItem();
});

Then('I should see the cart is empty message', async function () {
    await fixture.pages.cartPage.verifyCartEmpty();
});

Then('I should see the item still in my cart', async function () {
    await fixture.pages.cartPage.verifyItemInCart();
});
