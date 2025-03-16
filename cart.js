document.addEventListener("DOMContentLoaded", () => {
    // Elementos del modal y carrito
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeButton = document.querySelector(".close");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    const cartCount = document.getElementById("cart-count");

    // Obtenemos el contenedor de productos (funciona para index.html o all.html)
    const productsContainer = document.getElementById("products-items") || document.getElementById("products-items-all");

    // Recuperamos el carrito del localStorage o lo iniciamos vacío
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Función para actualizar la UI del carrito y guardar en localStorage
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItemsContainer.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Delegación de eventos en el contenedor de productos
    if (productsContainer) {
        productsContainer.addEventListener("click", function(e) {
            // Si se hizo click en un botón "add-to-cart"
            const addBtn = e.target.closest(".add-to-cart");
            if (addBtn) {
                e.preventDefault();
                e.stopPropagation();
                const name = addBtn.getAttribute("data-name");
                const price = parseFloat(addBtn.getAttribute("data-price"));
                cart.push({ name, price });
                updateCartUI();
                return; // Evitamos que se ejecute el resto del código
            }

            // Si no fue un click en el botón, se asume que es para ver detalles del producto
            const productCard = e.target.closest(".product-card.product");
            if (productCard) {
                const productId = productCard.getAttribute("data-id");
                if (productId) {
                    window.location.href = `detalle.html?id=${productId}`;
                } else {
                    console.warn("No se encontró data-id en el producto");
                }
            }
        });
    }

    // Listener para remover un producto del carrito
    cartItemsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartUI();
        }
    });

    // Listener para vaciar el carrito
    clearCartButton.addEventListener("click", () => {
        cart = [];
        updateCartUI();
    });

    // Listener para abrir el modal del carrito
    cartButton.addEventListener("click", e => {
        e.preventDefault();
        cartModal.classList.add("show");
    });

    // Listener para cerrar el modal con el botón de cerrar
    closeButton.addEventListener("click", () => {
        cartModal.classList.remove("show");
    });

    // Cerrar el modal si se hace click fuera del contenido
    window.addEventListener("click", e => {
        if (e.target === cartModal) {
            cartModal.classList.remove("show");
        }
    });

    // Actualizamos la UI del carrito al cargar la página
    updateCartUI();
});
