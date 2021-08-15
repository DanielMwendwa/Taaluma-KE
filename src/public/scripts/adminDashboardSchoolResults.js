// Init page module object.
const career = {};

// Cached menu items.
// career.careers = [];

career.tags = [];

// Data preloader.
career.preloadData = () => {
    // Get menu items container and clean it up.
    // const careerContainer = document.getElementById("container");
    // careerContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const school_code = urlParams.get("school_code");
    const queryStringObject = { school_code };
    const requestPayload = { path: "/api/performance", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        let performances = [];
        responsePayload.forEach((data) => {
            let propertyNames = Object.keys(data);
            let propertyValues = Object.values(data);
            let entries = Object.entries(data);
            performances.push(entries);
        });
        // console.log(performances)

        let container = document.getElementById("perf-details")
        performances.forEach((res) => {
            let table = document.createElement("table"); let row;
            table.style.padding = "10px";
            table.style.border = "2px solid black";
            table.style.margin = "2px";
            res.forEach((el) => {
                row = document.createElement("tr");
                row.innerHTML = `
                    <td>${el[0]}</td>
                    <td>${el[1]}</td>`;
                table.appendChild(row);
            });
            container.appendChild(table);
        });
    });
};

// Init user current page.
career.init = () => {
    // Preload data for the current page.
    career.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", career.init);
