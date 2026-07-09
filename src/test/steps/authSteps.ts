import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";

Given('I navigate to the register page', async function () {
    await fixture.pages.authPage.navigateToRegister();
});

Given('I navigate to the login page', async function () {
    await fixture.pages.authPage.navigateToLogin();
});

When('I submit the registration form with valid dynamic details', async function () {
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@example.com`;
    await fixture.pages.authPage.fillRegistrationDetails("Test", "User", email, "Password123!");
});

When('I submit the login form with email {string} and password {string}', async function (email: string, password: string) {
    await fixture.pages.authPage.fillLoginDetails(email, password);
});

Then('I should be successfully logged in', async function () {
    await fixture.pages.authPage.verifyLoginSuccess();
});

Then('I should see a login error message {string}', async function (expectedMessage: string) {
    await fixture.pages.authPage.verifyErrorMessage(expectedMessage);
});

When('I submit the registration form with firstName {string}, lastName {string}, email {string} and password {string}', async function (firstName: string, lastName: string, email: string, password: string) {
    // If the CSV provides an empty string, the parameter becomes empty
    await fixture.pages.authPage.fillRegistrationDetails(firstName, lastName, email, password);
});

Then('I should see the registration outcome {string}', async function (expectedError: string) {
    if (expectedError && expectedError.trim().length > 0) {
        // It's a sad path, we expect an error
        await fixture.pages.authPage.verifyErrorMessage(expectedError);
    } else {
        // It's a happy path, we expect success
        await fixture.pages.authPage.verifyLoginSuccess();
    }
});
