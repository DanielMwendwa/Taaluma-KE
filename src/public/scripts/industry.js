// Init page module object.
const industry = {};

industry.tags = [];

// Data preloader.
industry.preloadData = () => {
    // Get menu items container and clean it up.
    const industryContainer = document.getElementById("industryContainer");
    industryContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const queryStringObject = { code };
    const requestPayload = { path: "/api/industry", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        let careers = responsePayload.careers.slice(0,10);
        careers.forEach((doc) => {
            let title = doc.title;
            let percent_employed = doc._percent_employed;
            let code = doc.code;
            let desc = doc.desc;

            const itemElement = document.createElement("div");
            itemElement.innerHTML = `<div class="container">
                    <div class="course">
                        <div class="preview">
                            <h6>Course</h6>
                            <h2>Tags</h2>
                        </div>
                        <div class="info">
                            <div class="progress-wrapper">
                                <div class="progress"></div>
                                <span class="progress-text">${percent_employed}% employed</span>
                            </div>
                            <h2>${title}</h2>
                            <p class="p-trunc">${desc}</p>
                            <p class="p-trunc"></p>
                            <button class="btn" id="${code}">View Details</button>
                        </div>
                    </div>
                </div>
                `;
            industryContainer.appendChild(itemElement);

            const truncs = document.querySelectorAll(".p-trunc");
            truncs.forEach(trunc => {
                trunc.innerText = trunc.innerText.substring(0, 100) + "...";
            }) 

            // Add event listeners to card.
            document.querySelectorAll(".btn").forEach((card) => {
                card.addEventListener("click", (event) => {
                    if (event.target) {
                        console.log(event.target.id);
                        window.location = `/career?code=${event.target.id}`;
                    }
                });
            });
        });
    });
};

// Init user current page.
industry.init = () => {
    // Preload data for the current page.
    industry.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", industry.init);
