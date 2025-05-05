const { chromium } = require('playwright');
const {expect} = require('playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false }); 
  const page = await browser.newPage();

  await page.goto('https://www.airalo.com/');

  try {
    await page.click('button:has-text("ACCEPT")');
  } catch (e) {
    console.log('No cookie acceptance button found or already dismissed.');
  }
  try {
    await page.click('button:has-text("ALLOW")');
  } catch (e) {
    console.log('No allow button found or already dismissed.');
  }

  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('Japan');
  await page.getByRole('listitem').filter({ hasText: 'Japan' }).click();
  await page.getByRole('button', { name: 'Buy Now' }).first().click();
  await page.waitForSelector('[data-testid="sim-detail-info-list"]');
  await expect(await page.getByTestId('sim-detail-operator-title').innerText()).toBe('Moshi Moshi')
  await expect(await page.getByTestId('sim-detail-info-list').getByTestId('COVERAGE-value').innerText()).toBe('Japan')
  await expect(await page.getByTestId('sim-detail-info-list').getByTestId('DATA-value').innerText()).toBe('1 GB');
  await expect(await page.getByTestId('sim-detail-info-list').getByTestId('VALIDITY-value').innerText()).toBe('7 Days');
  await expect(await page.getByTestId('sim-detail-info-list').getByTestId('PRICE-value').innerText()).toBe('4.50 €');


  await browser.close();
})();