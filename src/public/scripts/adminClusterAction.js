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
    let requestPayload = { path: "/api/cluster", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload)
        let name = responsePayload.name;

        // Put the data into the forms as values where needed
        document.querySelector("#adminClusterAction input[name=name]").value = name;
    });

    requestPayload = { path: "/api/courses", method: "GET", queryStringObject };
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload)
        let careers_table = document.getElementById("courses-tables");
        responsePayload.forEach((el, index) => {
            let newDiv = document.createElement("div");
            newDiv.classList.add("container");
            newDiv.style.paddingTop = "10px";

            let course = el.name;
            let subjects = el.subjects.join(", ");
            let min_grade = el.grade;
            let min_req = JSON.stringify(el.requirements)
            min_req = min_req.replace(/['"]+/g, '') // removes quotation marks
            min_req = min_req.replace(/[{}]/g, ""); // removes curly braces
            min_req = min_req.split(",").join(", ") // adds space after comma

            newDiv.innerHTML = `<table>
                    <thead>
                        <tr>
                            <td>Course</td>
                            <td>${course}</td>
                        </tr>
                        <tr>
                            <td>Subjects</td>
                            <td>${subjects}</td>
                        </tr>
                        <tr>
                            <td>Minimum Grade</td>
                            <td>${min_grade}</td>
                        </tr>
                        <tr>
                            <td>Minimum Requirement</td>
                            <td>${min_req}</td>
                        </tr>
                        <tr>
                            <td>Careers</td>
                            <td><button class="view-btn">View careers</button></td>
                        </tr>
                    </thead>
                    <tbody id="cluster-careers-table-body"></tbody>
                </table>`;
            careers_table.appendChild(newDiv);
        });
    })
};

// Init user current page.
cluster.init = () => {
    // Preload data for the current page.
    cluster.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", cluster.init);
