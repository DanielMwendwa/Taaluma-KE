// Init page module object.
const career = {};

// Cached menu items.
career.items = [];

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
}


// Data preloader.
career.preloadData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cluster = urlParams.get("cluster");
    const queryStringObject = { cluster };
    // Fetch the career data.
    httpClient.request({ path: "/api/courses", method: "GET", queryStringObject }).then(({ statusCode, responsePayload }) => {
        // console.log(responsePayload);
        let [tableData] = responsePayload.map(val => val.careers);
        let table = document.getElementById("course-career-table");
        let courseTitleEl = document.getElementById("course-title");
        courseTitleEl.innerHTML = capitalizeTheFirstLetterOfEachWord(responsePayload[0].name);

        tableData.forEach((item, i) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td id="${item.code}" >${item.career}</td>`;
            table.appendChild(row);
        });

        document.querySelector(".myTable").addEventListener("click", (event) => {
            if (event.target && event.target.nodeName == "TD") {
                window.location = `/career?code=${event.target.id}`;
            }
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
