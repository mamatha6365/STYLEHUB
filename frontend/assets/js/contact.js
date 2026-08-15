
/* STYLEHUB CONTACT */

document.querySelector("#contactForm")?.addEventListener(
    "submit",
    e => {
        e.preventDefault();

        alert("Thank you! We will contact you soon.");

        e.target.reset();
    }
);