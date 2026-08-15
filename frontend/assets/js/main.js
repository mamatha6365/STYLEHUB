
/* STYLEHUB MAIN */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();
    updateLoginButton();
    setupMobileMenu();

});


function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("stylehub_cart") || "[]"
    );

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll("[data-cart-count]")
        .forEach(element => {
            element.textContent = count;
        });
}


function updateLoginButton() {

    const loggedIn =
        localStorage.getItem("stylehub_token");

    document.querySelectorAll("[data-account-link]")
        .forEach(link => {

            link.href = loggedIn
                ? "account.html"
                : "login.html";

        });
}


function setupMobileMenu() {

    const button =
        document.querySelector("[data-menu-button]");

    const menu =
        document.querySelector("[data-mobile-menu]");

    if (!button || !menu) return;

    button.onclick = () => {
        menu.classList.toggle("active");
    };
}


/* Search */

function searchProducts() {

    const input =
        document.querySelector("#searchInput");

    if (!input) return;

    const value =
        input.value.trim();

    if (value) {
        location.href =
            `products.html?search=${encodeURIComponent(value)}`;
    }
}


window.updateCartCount = updateCartCount;
window.searchProducts = searchProducts;