import {expect, test} from "@playwright/test";
import config from "../config.json";
import {login} from "../helpers/loginHelper";
import {takeScreenshot} from "../helpers/screenshotHelper";

test.describe("Login Functionality", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${config.app_url}/login`);
    });

    test.afterEach(async ({page}, testInfo) => {
        await takeScreenshot(page, `login-${testInfo.title}`);
    });

    test("Successful login", async ({page}) => {
        await login(page);
    });

    test("Unsuccessful login with incorrect password", async ({page}) => {
        await page.fill('#email-input', config.login.email);
        await page.fill('#password-input', config.invalid.password);
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('p')).toHaveText(/Invalid email or password/i);
    });

    test("Unsuccessful login with non-existent email", async ({page}) => {
        await page.fill('#email-input', config.invalid.email);
        await page.fill('#password-input', config.login.password);
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('p')).toHaveText(/Invalid email or password/i);
    });

    test("Unsuccessful login with empty fields", async ({page}) => {
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('#email-input:invalid')).toBeVisible();
        await expect(page.locator('#password-input:invalid')).toBeVisible();
    });
});
