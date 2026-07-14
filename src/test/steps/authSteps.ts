import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I navigate to the register page', async function () {
    fixture.logger.info("Navigating to the register page");
    await fixture.subStepLogger.info("Navigating to the register page");
    await fixture.pages.authPage.navigateToRegister();
    await fixture.subStepLogger.success("Navigation to the register page complete");
});

Given('I navigate to the login page', async function () {
    fixture.logger.info("Navigating to the login page");
    await fixture.subStepLogger.info("Navigating to the login page");
    await fixture.pages.authPage.navigateToLogin();
    await fixture.subStepLogger.success("Navigation to the login page complete");
});

When('I submit the registration form with valid dynamic details', async function () {
    fixture.logger.info("Submitting the registration form with valid dynamic details");
    await fixture.subStepLogger.info("Submitting the registration form with valid dynamic details");
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@example.com`;
    await fixture.pages.authPage.fillRegistrationDetails("Test", "User", email, "Password123!");
    await fixture.subStepLogger.success("Submitting the registration form with valid dynamic details complete");
});

When('I submit the login form with email {string} and password {string}', async function (email: string, password: string) {
    fixture.logger.info(`Submitting the login form with email: ${email}`);
    await fixture.subStepLogger.info(`Submitting the login form with email: ${email}`);
    await fixture.pages.authPage.fillLoginDetails(email, password);
    await fixture.subStepLogger.success(`Submitting the login form with email: ${email} complete`);
});

Then('I should be successfully logged in', async function () {
    fixture.logger.info("Verifying successful login");
    await fixture.subStepLogger.info("Verifying successful login");
    await fixture.pages.authPage.verifyLoginSuccess();
    await fixture.subStepLogger.success("Verified successful login");
});

Then('I should see a login error message {string}', async function (expectedMessage: string) {
    fixture.logger.info(`Verifying login error message: ${expectedMessage}`);
    await fixture.subStepLogger.info(`Verifying login error message: ${expectedMessage}`);
    await fixture.pages.authPage.verifyErrorMessage(expectedMessage);
    await fixture.subStepLogger.success(`Verified login error message: ${expectedMessage}`);
});

When('I submit the registration form with firstName {string}, lastName {string}, email {string} and password {string}', async function (firstName: string, lastName: string, email: string, password: string) {
    fixture.logger.info(`Submitting registration form with email: ${email}`);
    await fixture.subStepLogger.info(`Submitting registration form with email: ${email}`);
    // If the CSV provides an empty string, the parameter becomes empty
    await fixture.pages.authPage.fillRegistrationDetails(firstName, lastName, email, password);
    await fixture.subStepLogger.success(`Submitting registration form with email: ${email} complete`);
});

Then('I should see the registration outcome {string}', async function (expectedError: string) {
    fixture.logger.info(`Verifying registration outcome. Expected error: ${expectedError || 'None'}`);
    await fixture.subStepLogger.info(`Verifying registration outcome. Expected error: ${expectedError || 'None'}`);
    if (expectedError && expectedError.trim().length > 0) {
        // It's a sad path, we expect an error
        await fixture.pages.authPage.verifyErrorMessage(expectedError);
    } else {
        // It's a happy path, we expect success
        await fixture.pages.authPage.verifyLoginSuccess();
    }
    await fixture.subStepLogger.success(`Verified registration outcome. Expected error: ${expectedError || 'None'}`);
});
