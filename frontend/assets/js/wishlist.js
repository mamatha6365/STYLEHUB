document.addEventListener("DOMContentLoaded", showWishlist);

function getWishlist() {
    return JSON.parse(localStorage.getItem("stylehub_wishlist") || "[]");
}

function saveWishlist(items) {
    localStorage.setItem("stylehub_wishlist", JSON.stringify(items));
}

function addWishlist(product) {
    const items = getWishlist();

    if (items.some(item => item._id === product._id)) {
        alert("Already in wishlist.");
        return;
    }

    items.push(product);
    saveWishlist(items);
    alert("Added to wishlist!");
}

function removeWishlist(index) {
    const items = getWishlist();
    items.splice(index, 1);
    saveWishlist(items);
    showWishlist();
}

function showWishlist() {
    const box = document.querySelector("#wishlistGrid");
    if (!box) return;

    const items = getWishlist();

    if (!items.length) {
        box.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    box.innerHTML = items.map((item, index) => `
        <div class="wishlist-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <a href="product.html?id=${item._id}">
                View Product
            </a>
            <button onclick="removeWishlist(${index})">
                Remove
            </button>
        </div>
    `).join("");
}

window.addWishlist = addWishlist;
window.removeWishlist = removeWishlist;