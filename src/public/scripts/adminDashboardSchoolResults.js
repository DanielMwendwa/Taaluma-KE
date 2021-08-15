// Init page module object.
const career = {};

// Cached menu items.
// career.careers = [];

career.tags = [];

// Data preloader.
career.preloadData = () => {
    // Get menu items container and clean it up.
    // const careerContainer = document.getElementById("container");
    // careerContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const school_code = urlParams.get("school_code");
    const queryStringObject = { school_code };
    const requestPayload = { path: "/api/performance", method: "GET", queryStringObject };

    // Fetch the menu data.
    httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
        let performances = [];
        responsePayload.forEach((data) => {
            let propertyNames = Object.keys(data);
            let propertyValues = Object.values(data);
            let entries = Object.entries(data);
            performances.push(entries);
        });

        const subjects = {
            ENG: "English",
            KIS: "Kiswahili",
            MAT: "Mathematics",
            BIO: "Biology",
            PHY: "Physics",
            CHE: "Chemistry",
            GSC: "General Science",
            HAG: "History",
            GEO: "Geography",
            CRE: "CRE",
            IRE: "IRE",
            HRE: "HRE",
            HSC: "Home Science",
            ARD: "Art and Design",
            AGR: "Agriculture",
            WW: "Wood Work",
            MW: "Metal Work",
            BC: "Building Construction",
            PM: "Power Mechanics",
            ECT: "Electricity",
            DRD: "Drawing and Design",
            AVT: "Aviation Technology",
            CMP: "Computer Studies",
            FRE: "French",
            GER: "German",
            ARB: "Arabic",
            KSL: "Sign Language",
            MUC: "Music",
            BST: "Business Studies",
        };

        const studentDetails = {
            index: "Index Number",
            grade: "Grade",
            year: "KCSE Year",
        };

        const performanceColumn = { ...subjects, ...studentDetails };
        let container = document.getElementById("perf-details");
        performances.forEach((res) => {
            let table = document.createElement("table");
            let row;
            table.style.padding = "10px";
            table.style.border = "2px solid black";
            table.style.margin = "2px";
            res.forEach((el) => {
                row = document.createElement("tr");
                row.innerHTML = `
                    <td>${performanceColumn[el[0]]}</td>
                    <td>${el[1]}</td>`;
                table.appendChild(row);
            });
            container.appendChild(table);
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
