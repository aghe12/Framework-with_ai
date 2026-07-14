@pdp
Feature: Product Details Page (PDP) Navigation
  As a customer
  I want to be able to navigate to a product's details page
  So that I can view its specific title, price, images, and variant options

  @happy_path @smoke
  Scenario: Successfully navigate to a product details page from the catalog
    Given I am on the Catalog page
    When I click on the first product in the grid
    Then the Product Details Page should successfully load with title, price, image, and variants

  @Key:PDP_SoldOut_01 @smoke
  @sad_path
  Scenario: Navigate to an out-of-stock item and verify Add to Cart is disabled
    Given I am on the Catalog page
    When I click on a sold out product
    Then the "Add to Cart" button should be disabled and say "Sold Out"
