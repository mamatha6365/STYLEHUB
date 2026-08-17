/* STYLEHUB PRODUCTS */

document.addEventListener("DOMContentLoaded", async () => {

    const grid = document.querySelector("#productGrid");

    if (!grid) return;

    try {

        const result = await StyleHubAPI.get("/products");

        console.log("Products API result:", result);

        if (!result.success || !Array.isArray(result.products)) {
            grid.innerHTML = "<p>Unable to load products.</p>";
            return;
        }

        if (result.products.length === 0) {
            grid.innerHTML = "<p>No products available.</p>";
            return;
        }

        grid.innerHTML = result.products.map(product => `
            
            <div class="product-card">

                <img src="${product.image}"
                     alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.brand}</p>

                <strong>₹${product.price}</strong>

                <a href="product.html?id=${product._id}">
                    View Product
                </a>

                <button onclick='addToCart(${JSON.stringify(product)})'>
                    Add to Cart
                </button>

            </div>

        `).join("");

    } catch (error) {

        console.error("Products loading error:", error);

        grid.innerHTML =
            "<p>Unable to load products. Please try again.</p>";
    }
});


function addToCart(product) {

    const cart = JSON.parse(
        localStorage.getItem("stylehub_cart") || "[]"
    );

    const existing = cart.find(
        item => item.product === product._id
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "stylehub_cart",
        JSON.stringify(cart)
    );

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    alert("Added to cart!");
}