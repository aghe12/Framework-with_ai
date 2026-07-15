@smoke1
@checkout
Feature: Checkout Flow Functionality
  As a customer
  I want to be able to proceed to checkout and enter shipping details
  So that I can purchase products

  @Key:Checkout_01 @smoke
  @happy_path
  Scenario: Successfully navigate to checkout and enter shipping details
    Given I am on the Catalog page
    When I click on the first product in the grid
    And I add the product to the cart and proceed to checkout
    And I enter shipping details with email "<Email>", firstName "<FirstName>", lastName "<LastName>", address "<Address>", city "<City>", and zip "<Zip>"
    Then the checkout page should load successfully with the correct products


  @Key:Checkout_Blank_ZipCode_01 @smoke
  @sad_path
  Scenario: Attempt to checkout with only empty zip code
    Given I am on the Catalog page
    When I click on the first product in the grid
    And I add the product to the cart and proceed to checkout
    And I enter shipping details with email "<Email>", firstName "<FirstName>", lastName "<LastName>", address "<Address>", city "<City>", and zip "<Zip>"
    Then I should see a checkout error message "<expectedError>"

  @Key:Checkout_Blank_LastName_01
  @sad_path
  Scenario: Attempt to checkout with only empty last name
    Given I am on the Catalog page
    When I click on the first product in the grid
    And I add the product to the cart and proceed to checkout
    And I enter shipping details with email "<Email>", firstName "<FirstName>", lastName "<LastName>", address "<Address>", city "<City>", and zip "<Zip>"
    Then I should see a checkout error message "<expectedError>"
