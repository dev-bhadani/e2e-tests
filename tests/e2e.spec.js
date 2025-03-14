const {test, expect} = require('@playwright/test');

test.describe('LocalStorage Functionality', () => {
    test('Token is stored in localStorage after successful login', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'test@maddox123.ai');
        await page.fill('#password-input', 'supersecure');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:3000/');

        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBe('dummy_token_12345');
    });

    test('Token is removed from localStorage after logout', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'test@maddox123.ai');
        await page.fill('#password-input', 'supersecure');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:3000/');

        await page.click('button:has-text("Logout")');
        await expect(page).toHaveURL('http://localhost:3000/login');

        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBeNull();
    });

    test('Redirect to login if token is not present in localStorage', async ({page}) => {
        await page.goto('http://localhost:3000/');
        await expect(page).toHaveURL('http://localhost:3000/login');
    });

    test('Stay on home page if token is present in localStorage', async ({page}) => {
        await page.goto('http://localhost:3000/');
        await page.evaluate(() => localStorage.setItem('token', 'dummy_token_12345'));
        await page.reload();
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    /*   test('Redirect to login if token is invalid', async ({ page }) => {
           await page.goto('http://localhost:3000/');
           await page.evaluate(() => {
               console.log('Setting invalid token');
               localStorage.setItem('token', 'invalid_token');
           });
           await page.reload();
           await page.waitForTimeout(2000); // Wait for 2 seconds to allow redirection
           await expect(page).toHaveURL('http://localhost:3000/login', { timeout: 10000 });
       });*/
});

test.describe('Login Functionality', () => {
    test('Successful login', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'test@maddox123.ai');
        await page.fill('#password-input', 'supersecure');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('Unsuccessful login with incorrect password', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'test@maddox123.ai');
        await page.fill('#password-input', 'wrongpassword');
        await page.click('button[type="submit"]');
        await expect(page.locator('p')).toHaveText('Invalid email or password. Try again.');
    });

    test('Unsuccessful login with non-existent email', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'nonexistent@maddox123.ai');
        await page.fill('#password-input', 'supersecure');
        await page.click('button[type="submit"]');
        await expect(page.locator('p')).toHaveText('Invalid email or password. Try again.');
    });

    test('Unsuccessful login with empty fields', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.click('button[type="submit"]');
        await expect(page.locator('#email-input:invalid')).toBeVisible();
        await expect(page.locator('#password-input:invalid')).toBeVisible();
    });
});

test.describe('Counter Functionality', () => {
    test.use({
        async page({page}, use) {
            await page.goto('http://localhost:3000/login');
            await page.fill('#email-input', 'test@maddox123.ai');
            await page.fill('#password-input', 'supersecure');
            await page.click('button[type="submit"]');
            await expect(page).toHaveURL('http://localhost:3000/');
            await use(page);
        }
    });

    test('Increment counter', async ({page}) => {
        const counter = page.getByRole('paragraph');
        await expect(counter).toHaveText('0');

        await page.click('button.counterButton:has-text("+")');
        await expect(counter).toHaveText('1');

        await page.click('button.counterButton:has-text("+")');
        await expect(counter).toHaveText('2');
    });

    test('Decrement counter (Allow Negative Values)', async ({page}) => {
        const counter = page.getByRole('paragraph');
        await expect(counter).toHaveText('0');
        await page.click('button.counterButton:has-text("-")');
        await expect(counter).toHaveText('-1');
        await page.click('button.counterButton:has-text("-")');
        await expect(counter).toHaveText('-2');
        await page.click('button.counterButton:has-text("-")');
        await expect(counter).toHaveText('-3');
    });

    test('Reset counter', async ({page}) => {
        const counter = page.getByRole('paragraph');

        await page.click('button.counterButton:has-text("+")');
        await page.click('button.counterButton:has-text("+")');
        await expect(counter).toHaveText('2');

        await page.click('button.counterButton:has-text("Reset")');
        await expect(counter).toHaveText('0');
    });

    test('Sequential counter operations', async ({page}) => {
        const counter = page.getByRole('paragraph');

        for (let i = 0; i < 3; i++) {
            await page.click('button.counterButton:has-text("+")');
        }
        await expect(counter).toHaveText('3');

        for (let i = 0; i < 5; i++) {
            await page.click('button.counterButton:has-text("-")');
        }
        await expect(counter).toHaveText('-2');

        await page.click('button.counterButton:has-text("Reset")');
        await expect(counter).toHaveText('0');
    });

    test('Rapid clicking', async ({page}) => {
        const counter = page.getByRole('paragraph');

        for (let i = 0; i < 50; i++) {
            await page.click('button.counterButton:has-text("+")');
        }
        await expect(counter).toHaveText('50');

        for (let i = 0; i < 50; i++) {
            await page.click('button.counterButton:has-text("-")');
        }
        await expect(counter).toHaveText('0');

        await page.click('button.counterButton:has-text("Reset")');
        await expect(counter).toHaveText('0');
    });
});


test.describe('Logout Functionality', () => {
    test('Logout from home page', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'test@maddox123.ai');
        await page.fill('#password-input', 'supersecure');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:3000/');

        await page.click('button:has-text("Logout")');
        await expect(page).toHaveURL('http://localhost:3000/login');
    });

    test('Logout button not available', async ({page}) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('#email-input', 'test@maddox123.ai');
        await page.fill('#password-input', 'supersecure');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:3000/');

        const logoutButton = page.locator('button:has-text("Logout")');
        await expect(logoutButton).toBeVisible();
        await logoutButton.evaluate(node => node.remove());

        await expect(page.locator('button:has-text("Logout")')).not.toBeVisible();
    });

    test('Logout without being logged in', async ({page}) => {
        await page.goto('http://localhost:3000/');
        await expect(page.locator('button:has-text("Logout")')).not.toBeVisible();
    });
});
