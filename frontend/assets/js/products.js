/* STYLEHUB PRODUCT DETAILS */

document.addEventListener("DOMContentLoaded", async () => {

    const box = document.querySelector("#productDetails");

    if (!box) return;

    const id =
        new URLSearchParams(location.search).get("id");

    if (!id) {
        box.innerHTML = "<p>Product not found.</p>";
        return;
    }

    const result =
        await StyleHubAPI.get(`/products/${id}`);

    if (!result.success) {
        box.innerHTML = "<p>Product not found.</p>";
        return;
    }

    const product = result.product;

    box.innerHTML = `
        <div class="product-detail">

            <img src="${product.image}"
                 alt="${product.name}">

            <div>
                <p>${product.brand}</p>

                <h1>${product.name}</h1>

                <h2>₹${product.price}</h2>

                <p>${product.description}</p>

                <label>Size</label>

                <select id="size">
                    ${product.sizes.map(size =>
                        `<option>${size}</option>`
                    ).join("")}
                </select>

                <label>Color</label>

                <select id="color">
                    ${product.colors.map(color =>
                        `<option>${color}</option>`
                    ).join("")}
                </select>

                <button id="addProduct">
                    Add to Cart
                </button>

            </div>
        </div>
    `;

    document.querySelector("#addProduct")
        .onclick = () => addProduct(product);
});


function addProduct(product) {

    const cart = JSON.parse(
        localStorage.getItem("stylehub_cart") || "[]"
    );

    const size =
        document.querySelector("#size").value;

    const color =
        document.querySelector("#color").value;

    const item = cart.find(
        item =>
            item.product === product._id &&
            item.size === size &&
            item.color === color
    );

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            size,
            color,
            quantity: 1
        });
    }

    localStorage.setItem(
        "stylehub_cart",
        JSON.stringify(cart)
    );

    alert("Product added to cart!");
}