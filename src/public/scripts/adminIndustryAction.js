// Init page module object.
const industry = {};

// Cached menu items.
// industry.careers = [];

industry.tags = [];

// Data preloader.
industry.preloadData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const queryStringObject = { code };
    const requestPayload = { path: "/api/industry", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        let title = responsePayload.title;

        // Put the data into the forms as values where needed
        document.querySelector("#adminIndustryAction input[name=title]").value = title;

        let careers_table = document.getElementById("industry-careers-table-body");
        responsePayload.careers.forEach((el, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td>
                            <td>${el.title}</td>
                            <td>${el._percent_employed}</td>`;
            careers_table.appendChild(row);
        });
    });
};

// Init user current page.
industry.init = () => {
    // Preload data for the current page.
    industry.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", industry.init);
