document.addEventListener("DOMContentLoaded", showCart);

function getCart() {
    return JSON.parse(localStorage.getItem("stylehub_cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("stylehub_cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = getCart().reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll("[data-cart-count]").forEach(el => {
        el.textContent = count;
    });
}

function showCart() {
    const box = document.querySelector("#cartItems");
    const total = document.querySelector("#cartTotal");
    const cart = getCart();

    updateCartCount();

    if (!cart.length) {
        box.innerHTML = "<p>Your cart is empty.</p>";
        total.textContent = "₹0";
        return;
    }

    box.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">

            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>

                <button onclick="changeQty(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)">+</button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        </div>
    `).join("");

    total.textContent = "₹" + getTotal(cart);
}

function changeQty(index, amount) {
    const cart = getCart();

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    showCart();
}

function removeItem(index) {
    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    showCart();
}

function getTotal(cart) {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

window.getCart = getCart;
window.getTotal = getTotal;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;
window.changeQty = changeQty;
window.removeItem = removeItem;