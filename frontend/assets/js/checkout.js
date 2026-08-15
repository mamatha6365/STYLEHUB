/* STYLEHUB CHECKOUT */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#checkoutForm");

    if (!form) return;

    form.addEventListener("submit", async e => {

        e.preventDefault();

        const cart = getCart();

        if (!cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const user = JSON.parse(
            localStorage.getItem("stylehub_user") || "null"
        );

        const token =
            localStorage.getItem("stylehub_token");

        if (!user || !token) {
            alert("Please login before checkout.");
            location.href = "login.html";
            return;
        }

        const subtotal = getTotal(cart);
        const shipping = subtotal >= 1999 ? 0 : 99;
        const total = subtotal + shipping;

        const order = {
            items: cart,
            shippingAddress: {
                name: form.name.value,
                phone: form.phone.value,
                address: form.address.value,
                city: form.city.value,
                state: form.state.value,
                pincode: form.pincode.value
            },
            paymentMethod: form.paymentMethod.value,
            subtotal,
            shipping,
            discount: 0,
            total
        };

        const result = await StyleHubAPI.authPost(
            "/orders",
            order
        );

        if (!result.success) {
            alert(result.message);
            return;
        }

        localStorage.removeItem("stylehub_cart");

        alert("Order placed successfully!");

        location.href = "orders.html";
    });

});