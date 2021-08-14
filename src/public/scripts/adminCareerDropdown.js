// Init page module object.
const career = {};

// Cached menu items.
career.items = [];

// Data preloader.
career.preloadData = () => {
    // Fetch the career data.
    httpClient.request({ path: "/api/career/all", method: "GET" }).then(({ statusCode, responsePayload }) => {
        const selectEl = document.getElementById("career-selector")
        responsePayload.forEach((el) => {
            let optionEl = document.createElement("option");
            optionEl.value = el.Title;
            optionEl.id = el.Code;
            optionEl.innerHTML = el.Title;
            selectEl.appendChild(optionEl);
        })
    });
};

// Init user current page.
career.init = () => {
    // Preload data for the current page.
    career.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", career.init);