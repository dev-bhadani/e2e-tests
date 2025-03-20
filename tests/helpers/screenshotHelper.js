import {test} from "@playwright/test";

export async function takeScreenshot(page, name) {
    await page.screenshot({path: `screenshots/${name}.png`});
}

test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await takeScreenshot(page, `failed-${testInfo.title}`);
    }
});
