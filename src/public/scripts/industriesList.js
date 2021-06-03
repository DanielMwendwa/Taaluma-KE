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
        industriesList.items = responsePayload;
        responsePayload.forEach((menuItem) => {
            const containerId = `menuItem_${menuItem.code}`;
            const menuItemElement = document.createElement("div");
            // menuItemElement.className = "industry";
            menuItemElement.id = containerId;
            menuItemElement.innerHTML = `
                <div class="card card1 industry">
                    <div class="container">
                        <img src="/public/images/industries/${menuItem.code}.jpg" alt="${menuItem.title}">
                    </div>
                    <div class="details">
                        <h3><a href="javascript: void(0);" class="main" id="${menuItem.code}">${menuItem.title}</a></h3>
                        <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos, minus aperiam adipisci exercitationem.</p> -->
                    </div>
                </div>`;
            industriesContainer.appendChild(menuItemElement);

            // Add event listeners to "Add to C" button.
            document.querySelectorAll(".industry").forEach((item) => {
                item.addEventListener("click", (event) => {
                    if (event.target) {
                        console.log(event.target.id);
                        window.location = `/industry?code=${event.target.id}`;
                    }
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
