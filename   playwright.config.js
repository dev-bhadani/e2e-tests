import {defineConfig} from '@playwright/test';

export default defineConfig({
    reporter: "allure-playwright",

    webServer: {
        command: 'npm run dev', port: 3000, url: 'http://localhost:3000',
    }
});
