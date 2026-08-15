/* STYLEHUB NAVBAR */

document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector("#menuButton");
    const menu = document.querySelector("#mobileMenu");

    button?.addEventListener("click", () => {
        menu?.classList.toggle("active");
    });

});