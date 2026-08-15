
/* STYLEHUB LOGIN */

document.querySelector("#loginForm")?.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        const form = e.target;

        const data = await StyleHubAPI.post("/auth/login", {
            email: form.email.value,
            password: form.password.value
        });

        if (!data.success) {
            alert(data.message);
            return;
        }

        localStorage.setItem("stylehub_token", data.token);

        localStorage.setItem(
            "stylehub_user",
            JSON.stringify(data.user)
        );

        alert("Login successful!");

        location.href = "account.html";
    }
);