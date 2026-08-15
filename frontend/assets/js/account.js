document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("stylehub_user") || "null");

    if (!user) {
        document.querySelector("#accountName").textContent = "Please login";
        document.querySelector("#accountEmail").textContent = "-";
        document.querySelector("#accountPhone").textContent = "-";
        return;
    }

    document.querySelector("#accountName").textContent = user.name || "-";
    document.querySelector("#accountEmail").textContent = user.email || "-";
    document.querySelector("#accountPhone").textContent = user.phone || "Not added";

    document.querySelector("#logoutButton").onclick = () => {
        localStorage.removeItem("stylehub_user");
        localStorage.removeItem("stylehub_token");
        location.href = "index.html";
    };
});