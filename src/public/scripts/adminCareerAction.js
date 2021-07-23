// Init page module object.
const career = {};

// Cached menu items.
// career.careers = [];

career.tags = [];

// Data preloader.
career.preloadData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const queryStringObject = { code };
    const requestPayload = { path: "/api/career", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        let code = responsePayload.Code;
        let title = responsePayload.Title;
        let desc = responsePayload.Description;
        let alternate_titles = responsePayload.alternate_titles;
        let work_activities = responsePayload.work_activities;
        let education = responsePayload.education;

        // Put the data into the forms as values where needed
        document.querySelector("#adminCareerAction input[name=code]").value = code;
        document.querySelector("#adminCareerAction input[name=title]").value = title;
        document.querySelector("#adminCareerAction input[name=description]").value = desc;

        let alt_titles_table = document.getElementById("alt-titles-table-body");
        alternate_titles.forEach((el, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${el}</td>`;
            alt_titles_table.appendChild(row);
        });

        let edu_table = document.getElementById("edu-table-body");
        education.forEach((el, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${el}</td>`;
            edu_table.appendChild(row);
        });

        let act_table = document.getElementById("act-table-body");
        work_activities.forEach((el, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${el}</td>`;
            act_table.appendChild(row);
        });

        let tables = [alt_titles_table, edu_table, act_table];

        tables.forEach((table) => {
            let cells = table.getElementsByTagName("td");
            for (var i = 0; i < cells.length; i++) {
                cells[i].onclick = function () {
                    if (this.hasAttribute("data-clicked")) {
                        return;
                    }
                    this.setAttribute("data-clicked", "yes");
                    this.setAttribute("data-text", this.innerHTML);

                    let input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.value = this.innerHTML;
                    input.style.width = this.offsetWidth - this.clientLeft * 2 + "px";
                    input.style.height = this.offsetHeight - this.clientTop * 2 + "px";
                    input.style.border = "0px";
                    input.style.fontFamily = "inherit";
                    input.style.fontSize = "inherit";
                    input.style.textAlign = "inherit";
                    input.style.backgroundColor = "LightGoldenRodYellow";

                    input.onblur = function () {
                        let td = input.parentElement;
                        let orig_text = input.parentElement.getAttribute("data-text");
                        let current_text = this.value;

                        if (orig_text != current_text) {
                            // There are changes in the cell's text
                            // save to db with Ajax or fetch
                            td.removeAttribute("data-clicked");
                            td.removeAttribute("data-text");
                            td.innerHTML = current_text;
                            td.style.cssText = "padding: 5px";
                            console.log(orig_text + " is Changed to " + current_text);
                        } else {
                            td.removeAttribute("data-clicked");
                            td.removeAttribute("data-text");
                            td.innerHTML = orig_text;
                            td.style.cssText = "padding: 5px";
                            console.log("No Changes Made");
                        }
                    };

                    input.onkeypress = function () {
                        if (event.keyCode == 13) {
                            this.blur();
                        }
                    };
                    this.innerHTML = "";
                    this.style.cssText = "padding: 0px Opx";
                    this.append(input);
                    this.firstElementChild.select();
                };
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
