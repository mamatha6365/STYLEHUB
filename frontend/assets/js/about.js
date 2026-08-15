
/* STYLEHUB ABOUT */

document.addEventListener("DOMContentLoaded", () => {

    const year = document.querySelector("#aboutYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});