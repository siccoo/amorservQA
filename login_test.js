/* eslint-disable no-undef */
/**
 * Dependency Modules
 */
import { Builder, By, until } from "selenium-webdriver";
import { assert } from "chai";
import "chromedriver";

// Application Server
const serverUri = "https://amorserv-qa.vercel.app/"; // Update this URL to match your application's URL

describe("Login Page", function () {
  this.timeout(30000); // Set timeout to 30 seconds because Selenium tests can take time

  let browser;

  before(async function () {
    browser = await new Builder().forBrowser("chrome").build();
    await browser.get(serverUri); // Navigate to the login page before each test
  });

  after(async function () {
    if (browser) {
      await browser.quit(); // Quit the browser after all tests are done
    }
  });

  /**
   * Test case for successful login with valid credentials.
   */
  it("should log in successfully with valid credentials", async function () {
    await browser.findElement(By.cssSelector("#username")).sendKeys("admin");
    await browser.findElement(By.css("#password")).sendKeys("admin");
    await browser.findElement(By.css("#loginButton")).click();
    await browser.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Logged in successfully')]")),
      10000
    );
  });

  /**
   * Test case for failed login with invalid credentials.
   */
  it("should fail login with invalid credentials", async function () {
    await browser.findElement(By.css("#username")).sendKeys("wronguser");
    await browser.findElement(By.css("#password")).sendKeys("wrongpassword");
    await browser.findElement(By.css("#loginButton")).click();
    let errorMessage = await browser.findElement(By.css("#errorMessage")).getText();
    assert.strictEqual(errorMessage, "Invalid username or password");
  });

  /**
   * Test case for error message display when login fails.
   */
  it("should display error message when login fails", async function () {
    await browser.findElement(By.css("#username")).sendKeys("wronguser");
    await browser.findElement(By.css("#password")).sendKeys("wrongpassword");
    await browser.findElement(By.css("#loginButton")).click();
    await browser.wait(
      until.elementLocated(By.css("#errorMessage")),
      10000
    );
  });
});
