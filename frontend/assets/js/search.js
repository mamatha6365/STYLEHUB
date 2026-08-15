
/* STYLEHUB SEARCH */

document.querySelector("#searchForm")?.addEventListener(
    "submit",
    e => {
        e.preventDefault();

        const value =
            document.querySelector("#searchInput").value.trim();

        if (value) {
            location.href =
                `products.html?search=${encodeURIComponent(value)}`;
        }
    }
);