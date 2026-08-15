/* STYLEHUB ORDERS */

document.addEventListener("DOMContentLoaded", async () => {

    const box = document.querySelector("#ordersList");

    if (!box) return;

    const token =
        localStorage.getItem("stylehub_token");

    if (!token) {
        box.innerHTML = "<p>Please login to view orders.</p>";
        return;
    }

    const result =
        await StyleHubAPI.authGet("/orders/my");

    if (!result.success) {
        box.innerHTML = "<p>Unable to load orders.</p>";
        return;
    }

    if (!result.orders.length) {
        box.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    box.innerHTML = result.orders.map(order => `
        <div class="order-card">

            <h3>Order #${order._id.slice(-6)}</h3>

            <p>
                Status:
                <strong>${order.status}</strong>
            </p>

            <p>
                Total:
                <strong>₹${order.total}</strong>
            </p>

            <p>
                Payment:
                ${order.paymentMethod}
            </p>

            <p>
                Date:
                ${new Date(order.createdAt)
                    .toLocaleDateString()}
            </p>

            <button onclick="cancelOrder('${order._id}')">
                Cancel Order
            </button>

        </div>
    `).join("");
});


async function cancelOrder(id) {

    if (!confirm("Cancel this order?")) return;

    const result =
        await StyleHubAPI.put(
            `/orders/${id}/cancel`
        );

    alert(result.message);

    if (result.success) {
        location.reload();
    }
}