const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();
require("chromedriver");

jest.setTimeout(60000);

describe("Awork UI Test Project Creation", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should create a project", async () => {
    await driver.get("https://app.awork.com/projects");

    await driver
      .wait(
        until.elementLocated(By.css('[data-test="login-with-mail-button"]')),
        10000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//input[@placeholder='Email']")),
        10000
      )
      .sendKeys("hello@madahian.dev");

    await driver
      .findElement(By.id("password-input"))
      .sendKeys(process.env.PASSWORD);

    await driver
      .wait(
        until.elementLocated(By.css('[data-test="login-submit-button"]')),
        10000
      )
      .click();

    await driver.manage().setTimeouts({ implicit: 5000 });

    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            '//button[@class="btn btn--blue btn--primary btn--s btn--auto"]'
          ),
          10000
        )
      )
      .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath('//*[@data-test="project-name-input"]'),
          10000
        )
      )
      .sendKeys("Selenium Test Project");

    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            '//button[contains(@class, "btn") and .//span[normalize-space()="Next"]]'
          ),
          10000
        )
      )
      .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            '//button[contains(@class, "btn") and .//span[text()=" Skip "]]'
          ),
          10000
        )
      )
      .click();

    const element = await driver.wait(
      until.elementLocated(
        By.xpath("//aw-inline-text-field[@data-test='project-details-name']")
      ),
      10000
    );
    await driver.wait(until.elementIsVisible(element), 10000);

    expect(await element.isDisplayed()).toBe(true);
  });
});
