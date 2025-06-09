import {expect, test, test as setup} from '@playwright/test';
import {mkdirSync, existsSync} from 'fs';
import {dirname} from 'path';
import config from '../config.json';

const AuthFile = 'tests/loginAuth.json';
const dir = dirname(AuthFile);

if (!existsSync(dir)) {
    mkdirSync(dir, {recursive: true});
}

setup('authenticate', async ({page}) => {
    await page.goto(`${config.app_url}/login`);
    await page.fill('#email-input', config.login.email);
    await page.fill('#password-input', config.login.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(config.app_url);
    await page.context().storageState({path: AuthFile});
});
