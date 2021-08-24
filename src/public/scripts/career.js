// Init page module object.
const career = {};

// Cached menu items.
// career.careers = [];

career.tags = [];

// Data preloader.
career.preloadData = () => {
    // Get menu items container and clean it up.
    const careerContainer = document.getElementById("container");
    careerContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const queryStringObject = { code };
    const requestPayload = { path: "/api/career", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        let title = responsePayload.Title;
        let desc = responsePayload.Description;
        let alternate_titles = responsePayload.alternate_titles;
        let work_activities = responsePayload.work_activities;
        let education = responsePayload.education;

        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
            <h1>${title}</h1>
            <button class="btn btn-fav">Add to Favourites</button> 
        </div>
        <div class="blog-post">
            <h2 class="title">Description</h2>
            <p class="text">${desc}</p>
        </div>
        <div class="blog-post">
            <h2 class="title">Alternate titles</h2>
            <ul id="alt"></ul>
        </div>
        <div class="blog-post">
            <h2 class="title">Education</h2>
            <ul id="edu"></ul>
        </div>
        <div class="blog-post">
            <h2 class="title">Work Activities</h2>
            <ul id="act"></ul>
        </div>
        `;
        careerContainer.appendChild(itemElement);

        const altContainer = document.getElementById("alt");
        alternate_titles.forEach((el) => {
            const altEl = document.createElement("div");
            altEl.innerHTML = `<li>${el}</li>`;
            altContainer.appendChild(altEl);
        });

        const eduContainer = document.getElementById("edu");
        education.forEach((el) => {
            const eduEl = document.createElement("div");
            eduEl.innerHTML = `<li>${el}</li>`;
            eduContainer.appendChild(eduEl);
        });

        const actContainer = document.getElementById("act");
        work_activities.forEach((el) => {
            const actEl = document.createElement("div");
            actEl.innerHTML = `<li>${el}</li>`;
            actContainer.appendChild(actEl);
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
