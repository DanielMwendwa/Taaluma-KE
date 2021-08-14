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
    const requestPayload = { path: "/api/courses", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        responsePayload.forEach((doc) => {
            let name = doc.name;
            let cluster = doc.cluster;
            let grade = doc.grade;
            let subjects = doc.subjects.join(", ");
            let careers = doc.careers.length;

            const itemElement = document.createElement("div");
            itemElement.innerHTML = `<div class="container">
                    <div class="course">
                        <div class="preview">
                            <h1>Min Grade: </h1> 
                            <p>${grade}</p>
                            <h1>Subjects: </h1> 
                            <p>${subjects}</p>
                        </div>
                        <div class="info">
                            <div class="progress-wrapper">
                                <h3>Qualified</h3>
                            </div>
                            <h2>${name}</h2>
                            <h1 class="p-trunc">Careers: ${careers}</h1>
                            <button class="btn" id="${cluster}">View Careers</button>
                        </div>
                    </div>
                </div>
                `;
            coursesContainer.appendChild(itemElement);

            // Add event listeners to card.
            document.querySelectorAll(".btn").forEach((card) => {
                card.addEventListener("click", (event) => {
                    if (event.target) {
                        console.log(event.target.id);
                        window.location = `/course/careers?cluster=${event.target.id}`;
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
