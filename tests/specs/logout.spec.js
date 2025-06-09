import {test} from "@playwright/test";
import {logout} from "../helpers/loginHelper";
import config from "../config.json";

test.use({storageState: 'tests/loginAuth.json'});

test.describe("Logout Functionality", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${config.app_url}`);
    });

    test("Logout from home page", async ({page}) => {
        await logout(page);
    });
});
