import {expect, test} from "@playwright/test";
import config from "../config.json";
import {login, logout} from "../helpers/loginHelper";
import {getLocalStorageToken} from "../helpers/storageHelper";
import {takeScreenshot} from "../helpers/screenshotHelper";

test.describe("LocalStorage Functionality", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${config.app_url}/login`);
        await page.evaluate(() => localStorage.clear());
    });

    test.afterEach(async ({page}, testInfo) => {
        await takeScreenshot(page, `login-${testInfo.title}`);
    });

    test("Token is stored in localStorage after successful login", async ({page}) => {
        await login(page);
        await expect.poll(() => getLocalStorageToken(page)).toBe("dummy_token_12345");
    });

    test("Token is removed from localStorage after logout", async ({page}) => {
        await login(page);
        await logout(page);
        await expect.poll(() => getLocalStorageToken(page)).toBeNull();
    });

    test("Redirect to login if token is not present", async ({page}) => {
        await page.goto(config.app_url);
        await expect(page).toHaveURL(`${config.app_url}/login`);
    });

    test("Stay on home page if token is present", async ({page}) => {
        await page.evaluate(() => localStorage.setItem("token", "dummy_token_12345"));
        await page.goto(config.app_url);
        await expect(page).toHaveURL(config.app_url);
    });
});
