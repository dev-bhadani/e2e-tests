import {expect, test} from "@playwright/test";
import {login, logout} from "../helpers/loginHelper";
import config from "../config.json";

test.describe("Logout Functionality", () => {
    test.beforeEach(async ({page}) => {
        await login(page);
    });

    test("Logout from home page", async ({page}) => {
        await logout(page);
    });

    test("Logout button not available", async ({page}) => {
        const logoutButton = page.locator('button:has-text("Logout")');
        await expect(logoutButton).toBeVisible();
        await logoutButton.evaluate(node => node.remove());
        await expect(logoutButton).not.toBeVisible();
    });

    test("Logout without being logged in", async ({page}) => {
        await page.evaluate(() => localStorage.removeItem("token"));
        await page.goto(config.app_url);
        await expect(page).toHaveURL(`${config.app_url}/login`, {timeout: 8000});
        await expect(page.locator('button:has-text("Logout")')).not.toBeAttached();
    });
});
