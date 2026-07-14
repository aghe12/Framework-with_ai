import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I am on the Catalog page', async function () {
    fixture.logger.info("Navigating to the Catalog page");
    await fixture.subStepLogger.info("Navigating to the Catalog page");
    await fixture.pages.pdpPage.navigateToCatalog();
    await fixture.subStepLogger.success("Navigation to the Catalog page complete");
});

When('I click on the first product in the grid', async function () {
    fixture.logger.info("Clicking on the first product in the grid");
    await fixture.subStepLogger.info("Clicking on the first product in the grid");
    await fixture.pages.pdpPage.clickFirstProduct();
    await fixture.subStepLogger.success("Clicked on the first product in the grid");
});

Then('the Product Details Page should successfully load with title, price, image, and variants', async function () {
    fixture.logger.info("Verifying the Product Details Page successfully loaded");
    await fixture.subStepLogger.info("Verifying the Product Details Page successfully loaded");
    await fixture.pages.pdpPage.verifyPDPDetails();
    await fixture.subStepLogger.success("Verified the Product Details Page successfully loaded");
});

When('I click on a sold out product', async function () {
    fixture.logger.info("Clicking on a sold out product");
    await fixture.subStepLogger.info("Clicking on a sold out product");
    await fixture.pages.pdpPage.clickSoldOutProduct();
    await fixture.subStepLogger.success("Clicked on a sold out product");
});

Then('the "Add to Cart" button should be disabled and say "Sold Out"', async function () {
    fixture.logger.info("Verifying the Add to Cart button is disabled and says Sold Out");
    await fixture.subStepLogger.info("Verifying the Add to Cart button is disabled and says Sold Out");
    await fixture.pages.pdpPage.verifyProductIsSoldOut();
    await fixture.subStepLogger.success("Verified the Add to Cart button is disabled and says Sold Out");
});
