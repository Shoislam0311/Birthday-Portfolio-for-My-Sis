import { test } from '@playwright/test';

test('verify birthday website', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // Wait for loading screen to finish (it lasts about 2-3 seconds)
  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'full_page.png', fullPage: true });
  await page.screenshot({ path: 'hero.png', clip: { x: 0, y: 0, width: 1280, height: 720 } });

  const timeline = page.locator('#timeline');
  if (await timeline.isVisible()) {
    await timeline.screenshot({ path: 'timeline.png' });
  }

  const gallery = page.locator('#gallery');
  if (await gallery.isVisible()) {
    await gallery.screenshot({ path: 'gallery.png' });
  }
});
