import { test, expect } from '@playwright/test'
test("Playwright Screenshot Validation", async({page})=>{
    await page.goto("https://qademo.com/");

    //Verify Home page
    await expect(page.getByRole("heading", {name: "Your Playground for"})).toBeVisible();
    await expect(page.getByRole("heading", {name: "Automated Testing"})).toBeVisible();

    // Element screenshot
    await page.locator('[data-testid="product-card-4"]').screenshot({path: './screenshot/element-screenshot.png'});
    
    // Viewport screenshot
    await page.screenshot({path: './screenshot/page-screenshot.png'});
   
    // Full-page screenshot
    await page.screenshot({path: './screenshot/full-screenshot.png', fullPage: true});

});