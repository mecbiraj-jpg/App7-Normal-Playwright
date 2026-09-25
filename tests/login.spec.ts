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

//Negative scenario
test("Invalid Login", async({page})=>{
 await page.goto("https://qademo.com/");

 await page.locator('[data-testid="hero-signin-button"]').click();

 await expect(page).toHaveURL("https://qademo.com/login");

 const userName = page.getByPlaceholder("Enter your username or email");
 const password = page.getByPlaceholder("Enter your password");

 await userName.fill("Biraj");
 await password.fill("biraj@123");

 await page.locator('[data-testid="login-submit-button"]').click();

 const errorMessage = page.locator('[data-testid="login-error-message"]');
 await expect(errorMessage).toHaveText("Invalid username or password");

});

//Form validation 
test("Login without Credentials", async({page})=>{
 await page.goto("https://qademo.com/");

 await page.locator('[data-testid="hero-signin-button"]').click();

 await expect(page).toHaveURL("https://qademo.com/login");

 const userName = page.getByPlaceholder("Enter your username or email");
 const password = page.getByPlaceholder("Enter your password");

 await userName.fill("");
 await password.fill("");

 await page.locator('[data-testid="login-submit-button"]').click();

 await expect(page.getByText("Username or email is required")).toBeVisible();
 await expect(page.getByText("Password is required")).toBeVisible();

});

//Product / Add to Cart
test("Product add to Cart", async({page})=>{
await page.goto("https://qademo.com/");

await page.locator('[data-testid="hero-signin-button"]').click();
await expect(page).toHaveURL("https://qademo.com/login");

const userName = page.getByPlaceholder("Enter your username or email");
const password = page.getByPlaceholder("Enter your password");

await userName.fill("Pinku");
await password.fill("pRaj@1990");

await page.locator('[data-testid="login-submit-button"]').click();
await expect(page).toHaveURL("https://qademo.com/catalog");

//Verify Product page heading
await expect(page.getByText("Product Catalog")).toBeVisible();

//Verify product details
const productTitle = page.locator('[data-testid="product-name-4"]');
await expect(productTitle).toHaveText("Bluetooth Speaker")

const productDescription = page.locator('[data-testid="product-description-4"]');
await expect(productDescription).toHaveText("Portable Bluetooth speaker with 360-degree sound and 12-hour battery life.");

const productPrice = page.locator('[data-testid="product-price-4"]');
await expect(productPrice).toHaveText("$159.99")

// Add Product to Cart
await page.locator('[data-testid="product-add-to-cart-4"]').click();

//Click Cart
await page.locator('[data-testid="navbar-cart-link"]').click();
await expect(page).toHaveURL("https://qademo.com/cart");

//Verify Cart page
await expect(page.getByText("Shopping Cart")).toBeVisible();

});

