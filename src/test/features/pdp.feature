@smoke @pdp
Feature: Product Details Page (PDP) Navigation
  As a customer
  I want to be able to navigate to a product's details page
  So that I can view its specific title, price, images, and variant options

  @happy_path
  Scenario: Successfully navigate to a product details page from the catalog
    Given I am on the Catalog page
    When I click on the first product in the grid
    Then the Product Details Page should successfully load with title, price, image, and variants
