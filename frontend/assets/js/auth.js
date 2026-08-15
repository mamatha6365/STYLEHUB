/* STYLEHUB AUTH */

document.addEventListener("DOMContentLoaded", () => {

    const login = document.querySelector("#loginForm");
    const register = document.querySelector("#registerForm");

    if (login) {
        login.addEventListener("submit", async e => {
            e.preventDefault();

            const result = await StyleHubAPI.post("/auth/login", {
                email: login.email.value,
                password: login.password.value
            });

            if (!result.success) {
                alert(result.message);
                return;
            }

            localStorage.setItem("stylehub_token", result.token);
            localStorage.setItem(
                "stylehub_user",
                JSON.stringify(result.user)
            );

            window.location.href = "account.html";
        });
    }

    if (register) {
        register.addEventListener("submit", async e => {
            e.preventDefault();

            const result = await StyleHubAPI.post("/auth/register", {
                name: register.name.value,
                email: register.email.value,
                password: register.password.value,
                phone: register.phone?.value || ""
            });

            if (!result.success) {
                alert(result.message);
                return;
            }

            localStorage.setItem("stylehub_token", result.token);
            localStorage.setItem(
                "stylehub_user",
                JSON.stringify(result.user)
            );

            window.location.href = "account.html";
        });
    }

    document.querySelectorAll("[data-logout]").forEach(button => {
        button.onclick = () => {
            localStorage.removeItem("stylehub_token");
            localStorage.removeItem("stylehub_user");
            location.href = "index.html";
        };
    });

});