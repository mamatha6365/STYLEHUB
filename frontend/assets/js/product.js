/* STYLEHUB PRODUCT DETAILS */

document.addEventListener("DOMContentLoaded", loadProduct);

async function loadProduct() {

    const box = document.querySelector("#productDetails");
    const id = new URLSearchParams(location.search).get("id");

    const result = await StyleHubAPI.get(`/products/${id}`);
    const product = result.product;

    box.innerHTML = `
        <div class="product-detail">

            <img src="${product.image}" alt="${product.name}">

            <div>
                <p>${product.brand}</p>
                <h1>${product.name}</h1>
                <h2>₹${product.price}</h2>
                <p>${product.description}</p>

                <label>Size</label>

                <select id="size">
                    ${product.sizes.map(size => `<option>${size}</option>`).join("")}
                </select>

                <label>Color</label>

                <select id="color">
                    ${product.colors.map(color => `<option>${color}</option>`).join("")}
                </select>

                <button id="addProduct">
                    Add to Cart
                </button>
            </div>

        </div>
    `;

    document.querySelector("#addProduct").onclick =
        () => addProduct(product);
}


function addProduct(product) {

    const cart = JSON.parse(
        localStorage.getItem("stylehub_cart") || "[]"
    );

    cart.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: document.querySelector("#size").value,
        color: document.querySelector("#color").value,
        quantity: 1
    });

    localStorage.setItem(
        "stylehub_cart",
        JSON.stringify(cart)
    );

    alert("Product added to cart!");
}