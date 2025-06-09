import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
  workers: 1,
  testMatch: ['**/*.setup.js', '**/*.spec.js'],
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright']
  ],
  outputDir: 'test-results/',
});
