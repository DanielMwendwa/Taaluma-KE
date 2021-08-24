// Init page module object.
const logs = {};

// Cached menu items.
logs.items = [];

// Data preloader.
logs.preloadData = () => {
    // Fetch the logs data.
    httpClient.request({ path: "/api/logs", method: "GET" }).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        let tableData = responsePayload;
        let table = document.getElementById("logs-search-table");

        tableData = tableData.sort((x,y) => new Date(y.timestamp) - new Date(x.timestamp));

        tableData.forEach((d, index) => {
            let timestamp = new Date(d.timestamp);
            let ipAddress = d.address;
            let user = d.user;
            let event = d.event;
            let httpMethod = d.method;
            let route = d.route;
            let statusCode = d.code;
            const row = document.createElement("tr");
            row.innerHTML = `<td>${timestamp}</td>
                             <td>${ipAddress}</td>
                             <td>${user}</td>
                             <td>${event}</td>
                             <td>${httpMethod}</td>
                             <td>${route}</td>
                             <td>${statusCode}</td>`;
            if (statusCode === 200) {
                row.style.color = "green";
            } else if (statusCode === 201) {
                row.style.color = "orange";
            } else if (statusCode === 204) {
                row.style.color = "purple";
            }else if (statusCode === 400) {
                row.style.color = "red";
            } else {
                row.style.color = "black";
            }
            table.appendChild(row);
        });

        let options = {
            numberPerPage: 7, // Amount of data per page
            goBar: true, // Bar where you can enter the number of the page you want to go to
            pageCounter: true, // Count of pages, in which one are you, of how many pages
        };

        let filterOptions = {
            el: "#searchBox", // Text box to filter, can be a class or an ID
        };

        paginate.init(".myTable", options, filterOptions);
    });
};

// Init user current page.
logs.init = () => {
    // Preload data for the current page.
    logs.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", logs.init);
