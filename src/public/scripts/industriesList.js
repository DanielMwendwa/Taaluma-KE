// Init page module object.
const industriesList = {};

// Cached menu items.
industriesList.items = [];

// Data preloader.
industriesList.preloadData = () => {
    // Get menu items container and clean it up.
    const industriesContainer = document.getElementById("industriesContainer");
    industriesContainer.innerHTML = "";

    // Fetch the menu data.
    httpClient.request({ path: "/api/industries", method: "GET" }).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        industriesList.items = responsePayload;
        responsePayload.forEach((menuItem) => {
            const containerId = `menuItem_${menuItem.id}`;
            const menuItemElement = document.createElement("div");
            menuItemElement.className = "card text-center";
            menuItemElement.id = containerId;
            menuItemElement.innerHTML = `
                <div class="card card1">
                    <div class="container">
                        <img src="/public/images/industries/${menuItem.code}.jpg" alt="${menuItem.title}">
                    </div>
                    <div class="details">
                        <h3>${menuItem.title}</h3>
                        <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p> -->
                    </div>
                </div>`;
            industriesContainer.appendChild(menuItemElement);

            // Add event listeners to "Add to Cart" button.
            document.querySelector(`#${containerId} div`).addEventListener("click", (event) => {
                event.preventDefault();

                // Detect how many of items with current id are already in the basket.
                // Then increment its value.
                const basketItems = shoppingCart.cart.items || [];
                const existingItem = basketItems.filter((basketItem) => basketItem.id === menuItem.id).pop();
                const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

                shoppingCart.updateCart(httpClient, menuItem.id, newQuantity).then((shoppingCart) => {
                    app.drawShoppingCartCounter(shoppingCart);
                });
            });
        });
    });
};

// Init user current page.
industriesList.init = () => {
    // Preload data for the current page.
    industriesList.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", industriesList.init);
