import {expect, test} from "@playwright/test";
import {login} from "../helpers/loginHelper";

test.describe("Counter Functionality", () => {
    test.beforeEach(async ({page}) => {
        await login(page);
    });

    test("Increment, decrement, and reset counter", async ({page}) => {
        const counter = page.getByRole("paragraph");
        const incrementButton = page.locator('button.counterButton:has-text("+")');
        const decrementButton = page.locator('button.counterButton:has-text("-")');
        const resetButton = page.locator('button.counterButton:has-text("Reset")');
        await page.waitForSelector("p", {timeout: 3000});
        await expect.poll(async () => await counter.textContent()).toBe("0");
        await incrementButton.click();
        await expect.poll(async () => await counter.textContent()).toBe("1");
        await decrementButton.click();
        await expect.poll(async () => await counter.textContent()).toBe("0");
        await decrementButton.click();
        await expect.poll(async () => await counter.textContent()).toBe("-1");
        await resetButton.click();
        await expect.poll(async () => await counter.textContent()).toBe("0");
    });

    test("Rapid clicking test", async ({page}) => {
        const counter = page.getByRole("paragraph");
        const incrementButton = page.locator('button.counterButton:has-text("+")');
        const decrementButton = page.locator('button.counterButton:has-text("-")');
        await page.waitForSelector("p", {timeout: 8000});
        for (let i = 0; i < 50; i++) {
            await incrementButton.click();
        }
        await expect.poll(async () => await counter.textContent()).toBe("50");
        for (let i = 0; i < 50; i++) {
            await decrementButton.click();
        }
        await expect.poll(async () => await counter.textContent()).toBe("0");
    });
});
