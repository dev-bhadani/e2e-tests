import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests/specs', timeout: 30000, retries: 2, use: {
        headless: true, viewport: {width: 1280, height: 720}, actionTimeout: 0, ignoreHTTPSErrors: true,
    }, webServer: {
        command: 'npm run dev', port: 3000, url: 'http://localhost:3000', reuseExistingServer: !process.env.CI,
    }, projects: [{
        name: 'chromium', use: {browserName: 'chromium'},
    }, {
        name: 'firefox', use: {browserName: 'firefox'},
    }, {
        name: 'webkit', use: {browserName: 'webkit'},
    },],
});
