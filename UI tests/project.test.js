const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();
require("chromedriver");

jest.setTimeout(60000);

describe("Awork UI Test Project Creation", () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments("--start-maximized");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const waitAndClick = async (locator, timeout = 10000) => {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    await element.click();
    await driver.sleep(1000);
  };

  const waitAndSendKeys = async (locator, keys, timeout = 10000) => {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    await element.sendKeys(keys);
    await driver.sleep(1000);
  };

  const waitForElementVisible = async (locator, timeout = 10000) => {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    await driver.sleep(1000);
    return element;
  };

  test("Should create a project, add a task, and add a comment", async () => {
    await driver.get("https://app.awork.com/projects");
    await driver.sleep(1000);

    // Login
    await waitAndClick(
      By.xpath(
        '//button[contains(@class, "btn") and .//span[contains(text(), "Sign in with email & password")]]'
      )
    );
    await waitAndSendKeys(
      By.xpath("//input[@placeholder='Email']"),
      process.env.EMAIL
    );
    await waitAndSendKeys(By.id("password-input"), process.env.PASSWORD);
    await waitAndClick(By.css('[data-test="login-submit-button"]'));

    // Create a project
    await waitAndClick(
      By.xpath('//button[@class="btn btn--blue btn--primary btn--s btn--auto"]')
    );
    await waitAndSendKeys(
      By.xpath('//*[@data-test="project-name-input"]'),
      "Selenium Test Project"
    );
    await waitAndClick(
      By.xpath(
        '//button[contains(@class, "btn") and .//span[normalize-space()="Next"]]'
      )
    );
    await waitAndClick(
      By.xpath('//button[contains(@class, "btn") and .//span[text()=" Skip "]]')
    );

    const projectNameElement = await waitForElementVisible(
      By.xpath("//aw-inline-text-field[@data-test='project-details-name']")
    );
    expect(await projectNameElement.isDisplayed()).toBe(true);

    // Add a task
    await waitAndClick(
      By.xpath('//aw-tabbar-item[@data-intercom-target="tabbar-item-tasks"]')
    );
    await waitAndClick(
      By.xpath(
        '//button[contains(@class, "btn--blue") and .//i[text()="add"] and .//span[contains(text(), "Task")]]'
      )
    );
    await waitAndClick(
      By.xpath(
        '//aw-action-selector-item[contains(@class, "action-selector__item") and .//i[text()="task"] and .//span[text()="Task"]]'
      )
    );
    await waitAndSendKeys(
      By.xpath('//*[@data-test="task-name-input"]'),
      "Test Task"
    );
    await waitAndClick(
      By.xpath(
        '//button[@type="submit"][.//span[normalize-space(text())="Save"]]'
      )
    );

    const taskCreatedElement = await waitForElementVisible(
      By.xpath(
        '//div[contains(@class, "text") and contains(text(), "Task created successfully")]'
      )
    );
    expect(await taskCreatedElement.isDisplayed()).toBe(true);

    // Add a comment
    await waitAndClick(
      By.xpath(
        '//button[contains(@class, "btn--secondary") and .//span[normalize-space(text())="Navigate to task"]]'
      )
    );

    const commentInput = await waitForElementVisible(
      By.xpath('//aw-rich-text-editor[@data-test="comment-input"]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      commentInput
    );
    await driver.sleep(1000);

    const commentField = await waitForElementVisible(
      By.xpath(
        '//div[@contenteditable="true" and contains(@class, "tiptap") and contains(@class, "ProseMirror") and contains(@class, "comment-input")]'
      )
    );
    const commentText = "Test Comment";
    await commentField.sendKeys(commentText);
    await driver.sleep(1000);

    const saveCommentButton = await waitForElementVisible(
      By.xpath('//aw-button[@data-test="save-comment"]')
    );
    await driver.executeScript("arguments[0].click();", saveCommentButton);
    await driver.sleep(1000);

    const commentElement = await waitForElementVisible(
      By.xpath(`//article[.//p[text()="${commentText}"]]`)
    );
    expect(await commentElement.isDisplayed()).toBe(true);
  });
});
