// Init page module object.
const users = {};

// Cached menu items.
users.items = [];

// Data preloader.
users.preloadData = () => {
    // Fetch the users data.
    httpClient.request({ path: "/api/users/all", method: "GET" }).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        let tableData = responsePayload;
        let state = {
            querySet: tableData,

            page: 1,
            rows: 10,
            window: 5,
        };

        buildTable();

        function pagination(querySet, page, rows) {
            let trimStart = (page - 1) * rows;
            let trimEnd = trimStart + rows;

            let trimmedData = querySet.slice(trimStart, trimEnd);

            let pages = Math.round(querySet.length / rows);

            return {
                querySet: trimmedData,
                pages: pages,
            };
        }

        function pageButtons(pages) {
            var wrapper = document.getElementById("pagination-wrapper");

            wrapper.innerHTML = ``;
            console.log("Pages:", pages);

            var maxLeft = state.page - Math.floor(state.window / 2);
            var maxRight = state.page + Math.floor(state.window / 2);

            if (maxLeft < 1) {
                maxLeft = 1;
                maxRight = state.window;
            }

            if (maxRight > pages) {
                maxLeft = pages - (state.window - 1);

                if (maxLeft < 1) {
                    maxLeft = 1;
                }
                maxRight = pages;
            }

            for (let page = maxLeft; page <= maxRight; page++) {
                wrapper.innerHTML += `<button value=${page} class="page btn">${page}</button>`;
            }

            if (state.page != 1) {
                wrapper.innerHTML = `<button value=${1} class="page btn">&#171; First</button>` + wrapper.innerHTML;
            }

            if (state.page != pages) {
                wrapper.innerHTML += `<button value=${pages} class="page btn">Last &#187;</button>`;
            }

            document.querySelectorAll(".page").forEach((el) => {
                if (el.value == state.page) {
                    el.style.backgroundColor = "blue";
                }
                el.addEventListener("click", function (event) {
                    document.getElementById("users-table-body").innerHTML = "";

                    state.page = Number(this.value);

                    buildTable();
                });
            });
        }

        function buildTable() {
            let table = document.getElementById("users-table-body");

            let data = pagination(state.querySet, state.page, state.rows);
            let myList = data.querySet;

            myList.forEach((item, index) => {
                if (state.page > 1) {
                    index = index + state.rows * (state.page - 1);
                }
                //Keep in mind we are using "Template Litterals to create rows"
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.email}</td>
                    <td>${item.name}</td>
                    <td>${item.indexNumber}</td>
                    <td><button class="btn view" id="${item.email}">view</button></td>`;
                table.appendChild(row);
            });

            pageButtons(data.pages);
        }

        document.querySelectorAll(".btn.view").forEach((el) => {
            el.addEventListener("click", (event) => {
                if (event.target) {
                    console.log(event.target.id);
                    window.location = `/admin/user/action?id=${event.target.id}`;
                }
            });
        });

        document.getElementById("create-user").addEventListener("click", (event) => {
            window.location = "/admin/user/add";
        });
    });
};

// Init user current page.
users.init = () => {
    // Preload data for the current page.
    users.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", users.init);
