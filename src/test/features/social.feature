@social
Feature: Social Media Links
  As a customer
  I want to be able to access the store's social media pages
  So that I can follow them on various platforms

  @happy_path @smoke
  Scenario Outline: Verify social media link for <Platform>
    Given I navigate to the Home page
    Then I should see the "<Platform>" social link pointing to "<ExpectedUrl>"

    Examples:
      | Platform  | ExpectedUrl                                                           |
      | facebook  | http://www.facebook.com/shopify                                       |
      | twitter   | http://www.twitter.com/sauce_io                                       |
      | instagram | http://www.instagram.com/shopify                                      |
      | pinterest | http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/ |
      | rss       | /blogs/news.atom                                                      |
