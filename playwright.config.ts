import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  outputDir: 'test-results/',
});
