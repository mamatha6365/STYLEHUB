
/* STYLEHUB HOME */

document.addEventListener("DOMContentLoaded", async () => {

    const box = document.querySelector("#featuredProducts");

    if (!box) return;

    const result =
        await StyleHubAPI.get("/products");

    if (!result.success) {
        box.innerHTML =
            "<p>Unable to load products.</p>";
        return;
    }

    const products =
        result.products.slice(0, 8);

    box.innerHTML = products.map(product => `
        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.brand}</p>

            <strong>₹${product.price}</strong>

            <a href="product.html?id=${product._id}">
                View Product
            </a>

            <button onclick='addHomeCart(${JSON.stringify(product)})'>
                Add to Cart
            </button>

        </div>
    `).join("");
});


function addHomeCart(product) {

    const cart = JSON.parse(
        localStorage.getItem("stylehub_cart") || "[]"
    );

    const item = cart.find(
        item => item.product === product._id
    );

    if (item) {
        item.quantity++;
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

    updateCartCount();

    alert("Added to cart!");
}