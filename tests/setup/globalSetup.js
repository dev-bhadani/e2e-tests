import {test} from "@playwright/test";

test.beforeEach(async ({page}) => {
    page.on('console', message => {
        if (message.type() === 'error') {
            console.error(`Frontend Error: ${message.text()}`);
        }
    });
});
