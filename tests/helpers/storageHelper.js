export async function getLocalStorageToken(page) {
    return await page.evaluate(() => localStorage.getItem('token'));
}
