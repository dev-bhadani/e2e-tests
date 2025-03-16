import {test} from "@playwright/test";

test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({path: `screenshots/${testInfo.title}.png`, fullPage: true});
    }
});

test.beforeEach(async ({page}) => {
    page.on('console', message => {
        if (message.type() === 'error') {
            console.error(`Frontend Error: ${message.text()}`);
        }
    });
});
