import {expect, test} from "@playwright/test";
import {login, logout} from "../helpers/loginHelper";

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
});
