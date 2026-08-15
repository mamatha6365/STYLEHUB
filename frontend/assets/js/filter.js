/* STYLEHUB SHOP */
async function filterProducts() {
    const search = document.querySelector("#search").value;
    const category = document.querySelector("#category").value;
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);

    const url = params.toString()
        ? `/products/search/filter?${params}`
        : "/products";

    const data = await StyleHubAPI.get(url);
    const box = document.querySelector("#productGrid");

    box.innerHTML = data.products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.brand}</p>
            <strong>₹${p.price}</strong>

            <a href="product.html?id=${p._id}">
                View Product
            </a>

            <button class="wishlist-btn" data-id="${p._id}">
                ♡ Wishlist
            </button>
        </div>
    `).join("");

    document.querySelectorAll(".wishlist-btn").forEach(button => {
        button.onclick = () => {
            const product = data.products.find(
                p => p._id === button.dataset.id
            );

            addWishlist(product);
        };
    });
}

document.addEventListener("DOMContentLoaded", filterProducts);

document.querySelector("#filterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    filterProducts();
});