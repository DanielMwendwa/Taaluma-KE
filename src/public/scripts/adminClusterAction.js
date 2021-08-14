// Init page module object.
const cluster = {};

// Cached menu items.
// cluster.careers = [];

cluster.tags = [];

// Data preloader.
cluster.preloadData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cluster = urlParams.get("cluster");
    const queryStringObject = { cluster };
    const requestPayload = { path: "/api/cluster", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload)
        let name = responsePayload.name;

        // Put the data into the forms as values where needed
        document.querySelector("#adminClusterAction input[name=name]").value = name;

        let careers_table = document.getElementById("cluster-careers-table-body");
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
cluster.init = () => {
    // Preload data for the current page.
    cluster.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", cluster.init);
