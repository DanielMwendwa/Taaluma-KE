// Init page module object.
const career = {};

// Cached menu items.
career.items = [];

// Data preloader.
career.preloadData = () => {
    // Fetch the career data.
    httpClient.request({ path: "/api/career/all", method: "GET" }).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        let tableData = responsePayload;
        let table = document.getElementById("career-search-table");

        tableData.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td id="${item.Code}" >${item.Title}</td>`;
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

        document.querySelector(".myTable").addEventListener("click", (event) => {
            if (event.target && event.target.nodeName == "TD") {
                window.location = `/career?code=${event.target.id}`;
            }
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
