import {defineConfig} from '@playwright/test';


export default defineConfig({
    webServer: {
        command: 'npm run dev', port: 3000, url: 'http://localhost:3000',
    },
});
