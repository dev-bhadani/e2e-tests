import {expect, test} from "@playwright/test";
import config from "../config.json";
import {login, logout} from "../helpers/loginHelper";
import {getLocalStorageToken} from "../helpers/storageHelper";

test.use({storageState: 'tests/loginAuth.json'});

test.describe("LocalStorage Functionality", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${config.app_url}`);
        await page.evaluate(() => localStorage.clear());
    });

    test("Token is stored in localStorage after successful login", async ({page}) => {
        await login(page);
        await expect.poll(() => getLocalStorageToken(page)).toBe(config.token);
    });

    test("Token is removed from localStorage after logout", async ({page}) => {
        await login(page);
        await logout(page);
        await expect.poll(() => getLocalStorageToken(page)).toBeNull();
    });

    test("Redirect to login if token is not present", async ({page}) => {
        await page.evaluate(() => localStorage.clear());
        await page.goto(config.app_url);
        await expect(page).toHaveURL(`${config.app_url}/login`);
    });

    test("Stay on home page if token is present", async ({page}) => {
        await page.evaluate((token) => localStorage.setItem("token", token), config.token);
        await page.goto(config.app_url);
        await expect(page).toHaveURL(config.app_url);
    });
});
