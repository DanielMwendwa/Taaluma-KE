// Init page module object.
const industries = {};

// Cached menu items.
industries.items = [];

// Data preloader.
industries.preloadData = () => {
    // Get industries items container and clean it up.
    const industriesContainer = document.getElementById("industries_container");
    industriesContainer.innerHTML = "";

    // Fetch the industries data.
    httpClient.request({ path: "/api/industries", method: "GET" }).then(({ statusCode, responsePayload }) => {
        industries.items = responsePayload;
        industries.items.forEach((doc) => {
            let id = doc.code,
                title = doc.title,
                colors = [
                    "#FDDFDF",
                    "#DEFDE0",
                    "#FCF7DE",
                    "#DEF3FD",
                    "#f4e7da",
                    "#d5d5d4",
                    "#fceaff",
                    "#98d7a5",
                    "#f8d5a3",
                    "#97b3e6",
                    "#eaeda1",
                    "#F5F5F5",
                    "#E6E0D4",
                    "#F5F5F5",
                ],
                industryEl = document.createElement("div");
            industryEl.classList.add("industry");
            industryEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const industryInnerHTML = `
                <div class="img-container">
                    <img height="121" width="180" src="/public/images/industries/${id}.jpg" alt="${title}" />
                </div>
                <div class="info">
                    <span class="number">
                        <a href="javascript: void(0);" class="main" id="${id}">#${id.toString().padStart(3, "0")}</a>
                    </span>
                    <h3 class="name">${title}</h3>
                    <small class="type">Careers: <span>${50}</span></small>
                </div>`;
            industryEl.innerHTML = industryInnerHTML;
            industriesContainer.appendChild(industryEl);

            // Add event listeners to card.
            document.querySelectorAll(".industry").forEach((card) => {
                card.addEventListener("click", (event) => {
                    if (event.target) {
                        console.log(event.target.id);
                        window.location = `/industry?code=${event.target.id}`;
                    }
                });
            });
        });
    });
};

// Init user current page.
industries.init = () => {
    // Preload data for the current page.
    industries.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", industries.init);
