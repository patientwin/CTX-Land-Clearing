import { expect, test } from '@playwright/test';

test('homepage renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Land Clearing and Forestry Mulching in Austin, TX');
});

test('main nav links resolve', async ({ page }) => {
  await page.goto('/');
  const routes = ['/about/', '/services/', '/service-areas/', '/contact/'];
  for (const route of routes) {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
  }
});

test('required validation appears', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Submit Estimate Request' }).click();
  await expect(page.getByText(/Please enter/i).first()).toBeVisible();
});

test('successful form flow reaches thank you in local mode', async ({ page }) => {
  await page.goto('/contact/');
  await page.fill('#full-name', 'Test User');
  await page.fill('#full-phone', '5125551111');
  await page.fill('#full-email', 'test@example.com');
  await page.fill('#full-address', '123 Main St Austin TX');
  await page.selectOption('#full-service', 'Land Clearing');
  await page.fill('#full-message', 'Need estimate this month.');
  await page.getByRole('button', { name: 'Submit Estimate Request' }).click();
  await expect(page).toHaveURL(/\/thank-you\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Thank You');
});
