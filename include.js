document.addEventListener("DOMContentLoaded", function () {
    async function loadHTML(id, file) {
        let container = document.getElementById(id);
        if (container) {
            let response = await fetch(file);
            let content = await response.text();
            container.innerHTML = content;
        }
    }

    loadHTML("products-items", "components/product.html");
    loadHTML("products-items-all", "../components/product-all.html");
});
