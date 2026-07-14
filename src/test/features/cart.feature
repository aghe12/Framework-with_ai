@cart
Feature: Cart Management Functionality
  As a customer
  I want to be able to manage items in my cart
  So that I can easily prepare for checkout

  @happy_path @smoke
  Scenario: Update item quantity in the cart
    Given I am on the Catalog page
    When I click on the first product in the grid
    And I add the product to the cart
    And I navigate to the cart page
    And I update the quantity to "3"
    Then the cart should update the quantity to "3"

  @happy_path @smoke
  Scenario: Remove item from the cart
    Given I am on the Catalog page
    When I click on the first product in the grid
    And I add the product to the cart
    And I navigate to the cart page
    And I remove the item from the cart
    Then I should see the cart is empty message

  @happy_path @smoke
  Scenario: Cart persistence across sessions
    Given I am on the Catalog page
    When I click on the first product in the grid
    And I add the product to the cart
    And I navigate to the login page
    And I submit the login form with email "test_valid@example.com" and password "Password123!"
    And I navigate to the cart page
    Then I should see the item still in my cart
