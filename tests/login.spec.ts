//Import Playwright Module
import{test, expect} from '@playwright/test';

//Verify First page and move to Sign Up
test("User Sign Up Scuessifully", async({page})=>{
await page.goto("https://qademo.com/");

//Verify Main page heading
await expect(page.getByRole("heading", {name: "Your Playground for"})).toBeVisible();
await expect(page.getByRole("heading", {name: "Automated Testing"})).toBeVisible();

//Click Sign Up 
await page.getByRole("button", {name: "Sign Up"}).click();

//Move to Sign Up Page
await expect(page).toHaveURL("https://qademo.com/signup");

//Verify Sign Up page
await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

//User Sign 
const emailAddress = page.getByPlaceholder("john@example.com");
const phoneNumber = page.getByPlaceholder("+1 (555) 123-4567");
const userName = page.getByPlaceholder("johndoe (auto-generated if empty)");
const password = page.getByPlaceholder("Create a strong password");
const confirmPassword = page.getByPlaceholder("Re-enter your password");

await emailAddress.fill("bravebiraj@yahoo.com");
await phoneNumber.fill("+918010523250");
await userName.fill("Pinku");
await password.fill("pRaj@1990");
await confirmPassword.fill("pRaj@1990");

await page.getByRole("button", {name: "Create Account"}).click();

//Navigate to Sign Up page
await expect(page).toHaveURL("https://qademo.com/signup");

});

//User Sign In
test("User Sign In Sucessifully", async({page})=>{

    await page.goto("https://qademo.com/");

    await page.locator('[data-testid="hero-signin-button"]').click();

    await expect(page).toHaveURL("https://qademo.com/login");

    const userName = page.getByPlaceholder("Enter your username or email");
    const password = page.getByPlaceholder("Enter your password");

    await userName.fill("Pinku");
    await password.fill("pRaj@1990");

    await page.locator('[data-testid="login-submit-button"]').click();

    await expect(page).toHaveURL("https://qademo.com/catalog");

});