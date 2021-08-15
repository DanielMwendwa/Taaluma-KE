// Init page module object.
const users = {};

// Cached menu items.
users.items = [];

// Data preloader.
users.preloadData = () => {
    // Fetch the users data.
    httpClient.request({ path: "/api/schools", method: "GET" }).then(({ statusCode, responsePayload }) => {
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
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td><button class="btn approve" id="${item.email}-approve">Approve</button></td>
                    <td><button class="btn reject" id="${item.email}-reject">Reject</button></td>
                    <td><button hidden class="btn view" id="${item.email}-view">View Results</button></td>`;
                table.appendChild(row);

                queryStringObject = { email: item.email };
                httpClient
                    .request({ path: "/api/users", method: "GET", queryStringObject })
                    .then(({ statusCode, responsePayload }) => {
                        if (statusCode === 200) {
                            let btn = document.getElementById(`${item.email}-approve`);
                            let btn2 = document.getElementById(`${item.email}-reject`);
                            let btn3 = document.getElementById(`${item.email}-view`);
                            btn.style.display = "none";
                            btn2.style.display = "none";
                            btn3.removeAttribute("hidden");
                        }
                    });
            });

            pageButtons(data.pages);

            document.querySelectorAll(".btn.approve").forEach((el) => {
                el.addEventListener("click", (event) => {
                    let newPayload = {};
                    let email = event.target.id.split("-")[0];
                    httpClient
                        .request({ path: "/api/schools", method: "GET" })
                        .then(({ statusCode: newStatusCode, responsePayload: newResponsePayload }) => {
                            let res = newResponsePayload.filter((d) => d.email == email)[0];
                            newPayload.email = res.email;
                            newPayload.name = res.name;
                            newPayload.password = res.password;
                            newPayload.account = "school";
                            httpClient
                                .request({ path: "/api/users", method: "POST", payload: newPayload })
                                .then(({ statusCode: newStatusCode, responsePayload: newResponsePayload }) => {
                                    console.log(responsePayload)
                                    window.location = "/admin/dashboard/schools";
                                });
                        });
                });
            });

            document.querySelectorAll(".btn.reject").forEach((el) => {
                el.addEventListener("click", (event) => {
                    let email = event.target.id.split("-")[0];
                    queryStringObject = { email };
                    httpClient
                        .request({ path: "/api/schools", method: "DELETE", queryStringObject })
                        .then(({ statusCode: newStatusCode, responsePayload: newResponsePayload }) => {
                            console.log(responsePayload)
                            window.location = "/admin/dashboard/schools";
                        });
                });
            });

            document.querySelectorAll(".btn.view").forEach(el => {
                el.addEventListener("click", event => {
                    let school_code = event.target.id.split("-")[0];
                    queryStringObject = { school_code };
                    window.location = `/admin/dashboard/schools/results?school_code=${school_code}`;
                })
            })
        }
    });
};

// Init user current page.
users.init = () => {
    // Preload data for the current page.
    users.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", users.init);
