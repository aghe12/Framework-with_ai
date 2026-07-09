@smoke
Feature: Shopify Storefront Authentication Functionality
  As a customer
  I want to be able to create an account and log in
  So that I can manage my orders and profile


  @Key:Signup_01
  @auth @happy_path
  Scenario: Successfully register a new account
    Given I navigate to the register page
    When I submit the registration form with firstName "<FirstName>", lastName "<LastName>", email "<Email>" and password "<Password>"
    Then I should see the registration outcome "<expectedError>"

  @Key:Signup_Blank_01
  @auth @sad_path
  Scenario: Attempt to register with blank email
    Given I navigate to the register page
    When I submit the registration form with firstName "<FirstName>", lastName "<LastName>", email "<Email>" and password "<Password>"
    Then I should see the registration outcome "<expectedError>"

  @Key:Signup_Blank_Names_01
  @auth @sad_path
  Scenario: Attempt to register with blank names
    Given I navigate to the register page
    When I submit the registration form with firstName "<FirstName>", lastName "<LastName>", email "<Email>" and password "<Password>"
    Then I should see the registration outcome "<expectedError>"

  @Key:Signup_Existing_01
  @auth @sad_path
  Scenario: Attempt to register with an existing email
    Given I navigate to the register page
    When I submit the registration form with firstName "<FirstName>", lastName "<LastName>", email "<Email>" and password "<Password>"
    Then I should see the registration outcome "<expectedError>"

  @Key:Signup_ShortPass_01
  @auth @sad_path
  Scenario: Attempt to register with a short password
    Given I navigate to the register page
    When I submit the registration form with firstName "<FirstName>", lastName "<LastName>", email "<Email>" and password "<Password>"
    Then I should see the registration outcome "<expectedError>"

  @auth @happy_path
  Scenario: Successfully login with a valid account
    Given I navigate to the login page
    When I submit the login form with email "test_valid@example.com" and password "Password123!"
    Then I should be successfully logged in

  @auth @sad_path
  Scenario: Attempt to login with an invalid password
    Given I navigate to the login page
    When I submit the login form with email "test_valid@example.com" and password "WrongPassword!"
    Then I should see a login error message "Incorrect email or password."
