// Init page module object.
const industry = {};

// Cached menu items.
// industry.careers = [];

industry.tags = [];

// Data preloader.
industry.preloadData = () => {
    // Get menu items container and clean it up.
    const industryContainer = document.getElementById("industryContainer");
    industryContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // Fetch the menu data.
    queryStringObject = {code}
    httpClient
        .request({ path: "/api/industry", method: "GET", queryStringObject })
        .then(({ statusCode, responsePayload }) => {
            console.log(responsePayload)
            responsePayload.careers.forEach((career => {
                const itemElement = document.createElement("div");
                itemElement.innerHTML = `<div class="container">
                    <div class="course">
                        <div class="preview">
                            <h6>Course</h6>
                            <h2>Web Development</h2>
                            <a href="#"> View All Chapters </a>
                        </div>
                        <div class="info">
                            <div class="progress-wrapper">
                                <div class="progress"></div>
                                <span class="progress-text">4/9 Challenges</span>
                            </div>
                            <h6>Chapter 4</h6>
                            <h2>JAVASCRIPT, HTML & CSS</h2>
                            <p class="p-trunc"> Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB! </p>
                            <button class="btn">Next Channel</button>
                        </div>
                    </div>
                </div>
                `
                industryContainer.appendChild(itemElement);

                // const trunc = document.querySelector(".p-trunc");
                // trunc.innerText = trunc.innerText.substring(0, 100) + "...";
            }))

        });
};

// Init user current page.
industry.init = () => {
    // Preload data for the current page.
    industry.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", industry.init);
