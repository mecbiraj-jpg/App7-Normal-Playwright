import { test, expect } from '@playwright/test'
test("Negative Checkout Scenario", async({page})=>{
    await page.goto("https://qademo.com/");

    //Verify Home page
    await expect(page.getByRole("heading", {name: "Your Playground for"})).toBeVisible();
    await expect(page.getByRole("heading", {name: "Automated Testing"})).toBeVisible();

     //Click Sign in 
     await page.locator('[data-testid="hero-signin-button"]').click();

     //Navigate Login Page
    await expect(page).toHaveURL("https://qademo.com/login");

    //Login
    const userName = page.getByPlaceholder("Enter your username or email");
    const password = page.getByPlaceholder("Enter your password");

    await userName.fill("Pinku");
    await password.fill("pRaj@1990");

    await page.locator('[data-testid="login-submit-button"]').click();

    //Navigate Product Page
    await expect(page).toHaveURL("https://qademo.com/catalog");

    //Verify Product Page
    await expect(page.getByText("Product Catalog")).toBeVisible();

    //Verify User
    const loginUser = page.locator('[data-testid="navbar-username"]');
    await expect(loginUser).toHaveText("Pinku");

    //Verify Product detail Backpack
    const itemName = page.locator('[data-testid="product-name-3"]');
    await expect(itemName).toHaveText("Laptop Backpack");

    const itemDescription = page.locator('[data-testid="product-description-3"]');
    await expect(itemDescription).toHaveText("Durable laptop backpack with multiple compartments and USB charging port.");

    const itemPrice = page.locator('[data-testid="product-price-3"]');
    await expect(itemPrice).toHaveText("$49.99");

    //Add to cart for Backpack
    await page.locator('[data-testid="product-add-to-cart-3"]').click();

    //Click Cart
    await page.locator('[data-testid="navbar-cart-link"]').click();

    //Move to Cart Page
    await expect(page).toHaveURL("https://qademo.com/cart");

    //Verify Cart page
    await expect(page.getByText("Shopping Cart")).toBeVisible();

    //Verify items in cart page Backpack
    const firstCartItemName = page.locator('[data-testid="cart-item-name-3"]');
    await expect(firstCartItemName).toHaveText("Laptop Backpack");

    const firstCartItemDescription = page.locator('[data-testid="cart-item-description-3"]');
    await expect(firstCartItemDescription).toHaveText("Durable laptop backpack with multiple compartments and USB charging port.");

    const firstItemPrice = page.locator('[data-testid="cart-item-subtotal-3"]');
    await expect(firstItemPrice).toHaveText("$49.99");

    //Verify Order Summery
    await expect(page.getByText("Order Summary")).toBeVisible();

    const subtotal = page.locator('[data-testid="order-subtotal"]');
    await expect(subtotal).toHaveText("$49.99");

    const shipping = page.locator('[data-testid="order-shipping"]');
    await expect(shipping).toHaveText("Free");

    const totalPrice = page.locator('[data-testid="order-total"]');
    await expect(totalPrice).toHaveText("$49.99");

    //Click Checkout
    await page.getByRole("button", {name: "Proceed to Checkout"}).click();

    //navigate to Payment Page
    await expect(page).toHaveURL("https://qademo.com/checkout");

    //Verify Payment Page
    await expect(
        page.getByRole("heading", {name: "Checkout"})
    ).toBeVisible();

    await expect(page.getByText("Shipping Information")).toBeVisible();


    // Click Place Order without filling shipping/payment details
    await page.getByRole("button", {name: "Place order for $49.99"}).click();

    //Check Negative Checkout
    await expect(page.getByText("First name is required", {exact: true})).toBeVisible();
    await expect(page.getByText("Last name is required", {exact: true})).toBeVisible();
    await expect(page.getByText("Address is required", {exact: true})).toBeVisible();
    await expect(page.getByText("Card number is required", {exact: true})).toBeVisible();
    await expect(page.getByText("Expiry is required", {exact: true})).toBeVisible();
    await expect(page.getByText("CVV is required", {exact: true})).toBeVisible();
    await expect(page.getByText("Name is required", {exact: true})).toBeVisible();

});