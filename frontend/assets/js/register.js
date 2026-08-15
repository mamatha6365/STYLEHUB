
/* STYLEHUB REGISTER */

document.querySelector("#registerForm")?.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        const form = e.target;

        const data = await StyleHubAPI.post("/auth/register", {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            phone: form.phone.value
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

        alert("Registration successful!");

        location.href = "account.html";
    }
);