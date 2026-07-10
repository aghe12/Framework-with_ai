import { Page, expect } from "@playwright/test";
import Assert from "../helper/wrapper/Assert";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";

export default class PdpPage {
  private wrapper: PlaywrightWrapper;
  private assert: Assert;

  constructor(private page: Page) {
    this.wrapper = new PlaywrightWrapper(page);
    this.assert = new Assert(page);
  }

  async navigateToCatalog() {
    await this.wrapper.goto(`${process.env.BASEURL}/collections/all`);
  }

  async clickFirstProduct() {
    const productLinkLocator = 'a[href*="/products/"]';
    await this.assert.assertElementVisible(productLinkLocator);
    await this.wrapper.click(productLinkLocator);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyPDPDetails() {
    // Wait a moment for page transition before asserting
    await this.page.waitForLoadState("domcontentloaded");

    // Verify Title is present by finding an H1 that actually has text
    const titleLocator = this.page
      .locator("h1")
      .filter({ hasText: /[a-zA-Z0-9]/ });
    await expect(titleLocator.first()).toBeVisible({ timeout: 10000 });
    const titleText = await titleLocator.first().innerText();
    expect(titleText.trim().length).toBeGreaterThan(0);

    // Verify Price is present
    const priceLocator = this.page
      .locator(
        '.price, .money, .price-item, .product__price, .product-single__price, .product-price, #product-price, [itemprop="price"]',
      )
      .filter({ hasText: /[$£€\d]/ });
    await expect(priceLocator.first()).toBeVisible({ timeout: 10000 });
    const priceText = await priceLocator.first().innerText();
    expect(priceText).toMatch(/[$£€\d]/);

    // Verify Image is present
    const imageLocator = "img";
    const imagesCount = await this.wrapper.count(imageLocator);
    expect(imagesCount).toBeGreaterThan(0);

    // Verify Variant Selectors or Add to Cart form
    const productFormLocator = 'form[action*="/cart/add"]';
    await this.assert.assertElementVisible(productFormLocator);
  }

  async clickSoldOutProduct() {
    const soldOutProductLocator = "a:has(.sold-out)";
    await this.assert.assertElementVisible(soldOutProductLocator);
    await this.wrapper.click(soldOutProductLocator);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyProductIsSoldOut() {
    // Wait a moment for page transition
    await this.page.waitForLoadState("domcontentloaded");

    // Locate the Add to Cart button (often changes to a disabled 'Sold Out' button)
    const addToCartBtn = this.page
      .locator(
        'form[action*="/cart/add"] button[type="submit"], form[action*="/cart/add"] input[type="submit"], #add, .add-to-cart, [value*="Sold Out" i], button:has-text("Sold Out")',
      )
      .first();
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });

    // Assert it is disabled
    await expect(addToCartBtn).toBeDisabled();

    // Assert text says Sold out (case insensitive check). It could be innerText or the value attribute for input tags.
    const textContent = (await addToCartBtn.textContent()) || "";
    const valueAttr = (await addToCartBtn.getAttribute("value")) || "";
    const combinedText = textContent + " " + valueAttr;
    expect(combinedText.toLowerCase()).toContain("sold out");
  }
}
