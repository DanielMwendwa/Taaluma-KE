// Init page module object.
const cluster = {};

// Cached menu items.
// cluster.careers = [];

cluster.tags = [];

// Data preloader.
cluster.preloadData = () => {
    // Get menu items container and clean it up.
    const coursesContainer = document.getElementById("courses-container");
    coursesContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const cluster = urlParams.get("cluster");
    const queryStringObject = { cluster };
    const requestPayload = { path: "/api/cluster", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        responsePayload.forEach((doc, index) => {

            // Check for null
            index = +1;
            let name = doc.name;
            let cluster1 = doc.details["1"];
            let cluster2 = doc.details["2"];
            let cluster3 = doc.details["3"];
            let cluster4 = doc.details["4"];

            const itemElement = document.createElement("div");
            itemElement.innerHTML = `<div class="card">
                <h2>${index}. ${name}</h2>

                <div style="display:flex;">

                    <div class="container">
                        <h3>Cluster subjects</h3>
                        <table class="table" style="table-layout: fixed; width: 100%">
                            <thead>
                                <tr>
                                    <th>Cluster</th>
                                    <th>Subjects</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>${cluster1}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>${cluster2}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>${cluster3}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td style="word-wrap: break-word">${cluster4}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="total">
                            <span>Status</span>
                            <span>Passed</span>
                        </div>
                    </div>

                    <div class="container1">
                        <h3>Min requirements</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Subjects</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>MATH</td>
                                    <td>A</>
                                </tr>
                                <tr>
                                    <td>ENG</td>
                                    <td>C+</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="total">
                            <span>Status</span>
                            <span>Passed</span>
                        </div>
                        
                    </div>
                </div>
            </div>`;
            // <button class="btn">View Careers</button>
            coursesContainer.appendChild(itemElement);

            // Add event listeners to card.
            document.querySelectorAll(".course-btn").forEach((card) => {
                card.addEventListener("click", (event) => {
                    if (event.target) {
                        console.log(event.target.id);
                        // window.location = `/industry?code=${event.target.id}`;
                    }
                });
            });
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
