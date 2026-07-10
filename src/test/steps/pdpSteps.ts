import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I am on the Catalog page', async function () {
    await fixture.pages.pdpPage.navigateToCatalog();
});

When('I click on the first product in the grid', async function () {
    await fixture.pages.pdpPage.clickFirstProduct();
});

Then('the Product Details Page should successfully load with title, price, image, and variants', async function () {
    await fixture.pages.pdpPage.verifyPDPDetails();
});

When('I click on a sold out product', async function () {
    await fixture.pages.pdpPage.clickSoldOutProduct();
});

Then('the "Add to Cart" button should be disabled and say "Sold Out"', async function () {
    await fixture.pages.pdpPage.verifyProductIsSoldOut();
});
