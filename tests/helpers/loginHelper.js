import config from "../config.json";
import {expect} from "@playwright/test";

export async function login(page) {
    await page.goto(`${config.app_url}/login`);
    await page.fill('#email-input', config.login.email);
    await page.fill('#password-input', config.login.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(config.app_url);
}

export async function logout(page) {
    await page.locator('button:has-text("Logout")').click();
    await expect(page).toHaveURL(`${config.app_url}/login`);
}
