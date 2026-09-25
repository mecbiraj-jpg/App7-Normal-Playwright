import{test, expect} from '@playwright/test';

test("Add Product and Checkout", async({page})=>{
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

    //Verify Product detail Backpack
    const secondItemName = page.locator('[data-testid="product-name-7"]');
    await expect(secondItemName).toHaveText("Mechanical Keyboard");

    const secondItemDescription = page.locator('[data-testid="product-description-7"]');
    await expect(secondItemDescription).toHaveText("RGB mechanical gaming keyboard with customizable keys and wrist rest.");

    const secondItemPrice = page.locator('[data-testid="product-price-7"]');
    await expect(secondItemPrice).toHaveText("$149.99");

    //Add to cart for Keyboard
    await page.locator('[data-testid="product-add-to-cart-7"]').click();

    //Verify Cart Count items on cart
    const cartCount = page.locator('[data-testid="navbar-cart-badge"]');
    await expect(cartCount).toHaveText("2");

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

    //Verify items in cart page Keyboard
    const secondCartItemName = page.locator('[data-testid="cart-item-name-7"]');
    await expect(secondCartItemName).toHaveText("Mechanical Keyboard");

    const secondCartItemDescription = page.locator('[data-testid="cart-item-description-7"]');
    await expect(secondCartItemDescription).toHaveText("RGB mechanical gaming keyboard with customizable keys and wrist rest.");

    const secondCartItemPrice = page.locator('[data-testid="cart-item-subtotal-7"]');
    await expect(secondCartItemPrice).toHaveText("$149.99");

    //Verify Order Summery
    await expect(page.getByText("Order Summary")).toBeVisible();

    const subtotal = page.locator('[data-testid="order-subtotal"]');
    await expect(subtotal).toHaveText("$199.98");

    const shipping = page.locator('[data-testid="order-shipping"]');
    await expect(shipping).toHaveText("Free");

    const totalPrice = page.locator('[data-testid="order-total"]');
    await expect(totalPrice).toHaveText("$199.98");

    // Remove Backpack
    await page.locator('[data-testid="cart-item-remove-3"]').click();

    await expect(
    page.locator('[data-testid="cart-item-name-3"]')
    ).toHaveCount(0);

    // Remove Keyboard
    await page.locator('[data-testid="cart-item-remove-7"]').click();

    await expect(
    page.locator('[data-testid="cart-item-name-7"]')
    ).toHaveCount(0);

    const emptyCart = page.locator('[data-testid="cart-empty-heading"]');
    await expect(emptyCart).toHaveText("Your cart is empty");

});