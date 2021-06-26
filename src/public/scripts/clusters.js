// Init page module object.
const clusters = {};

// Cached clusters.
clusters.items = [];

// Data preloader.
clusters.preloadData = () => {
    // Get clusters container and clean it up.
    const clustersContainer = document.getElementById("clusters_container");
    clustersContainer.innerHTML = "";

    // Fetch the clusters data.
    httpClient.request({ path: "/api/clusters", method: "GET" }).then(({ statusCode, responsePayload }) => {
        clusters.items = responsePayload;
        clusters.items.forEach((doc) => {
            let id = doc.cluster,
                name = doc.name,
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
                clusterEl = document.createElement("div");
            clusterEl.classList.add("cluster");
            clusterEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const clusterInnerHTML = `
                <div class="img-container">
                    <img height="125" width="180" src="/public/images/clusters/${id}.jpg" alt="${name}" />
                </div>
                <div class="info">
                    <span class="number">
                        <a href="javascript: void(0);" class="main" id="${id}">#${id.toString().padStart(3, "0")}</a>
                    </span>
                    <h3 class="name">${name}</h3>
                    <small class="type">Courses: <span>${50}</span></small>
                </div>`;
            clusterEl.innerHTML = clusterInnerHTML;
            clustersContainer.appendChild(clusterEl);

            // Add event listeners to card.
            document.querySelectorAll(".cluster").forEach((card) => {
                card.addEventListener("click", (event) => {
                    if (event.target) {
                        console.log(event.target.id);
                        window.location = `/industry?cluster=${event.target.id}`;
                    }
                });
            });
        });
    });
};

// Init user current page.
clusters.init = () => {
    // Preload data for the current page.
    clusters.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", clusters.init);
