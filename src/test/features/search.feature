 @search
Feature: Shopify Storefront Search Functionality
  As a customer
  I want to be able to search for products
  So that I can quickly find what I am looking for

@Key:Search_01 @smoke
@happy_path
  Scenario: Search for a product that exists in the store
    Given I am on the Shopify storefront homepage
    When I search for "<searchTerm>"
    Then I should see product results

@Key:Search_Invalid_01 @smoke
@sad_path
  Scenario: Search for a product that does not exist
    Given I am on the Shopify storefront homepage
    When I search for "<searchTerm>"
    Then I should see a no results message

  @Key:Search_Invalid_02 @smoke1
 @sad_path
  Scenario: Search using numbers only
    Given I am on the Shopify storefront homepage
    When I search for "<searchTerm>"
    Then I should see a no results message
    And the search UI should handle the input gracefully

  @Key:Search_Invalid_03 @smoke
 @sad_path
  Scenario: Search using emoji characters
    Given I am on the Shopify storefront homepage
    When I search for "<searchTerm>"
    Then I should see a no results message
    And the search UI should handle the input gracefully

  @Key:Search_Empty_01 @smoke
 @sad_path
  Scenario: Search with an empty string or whitespace
    Given I am on the Shopify storefront homepage
    When I search with empty whitespace "<searchTerm>"
    Then I should see the search does not break and shows appropriate feedback
