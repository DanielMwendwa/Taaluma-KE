// Init page module object.
const userAccountEdit = {};

// Data preloader.
userAccountEdit.preloadData = () => {
    // Get the email number from the current token, or log the user out if none is there.
    const token = auth.getToken();
    const email = (token && token.email) || false;
    if (!email) {
        auth.logUserOut(httpClient).then(() => {
            window.location = "/";
        });
    }

    // Fetch the user data
    let queryStringObject = { email };
    httpClient
        .request({ headers: { token: token._id }, path: "/api/users", method: "GET", queryStringObject })
        .then(({ statusCode, responsePayload }) => {
            console.log(statusCode);
            if (statusCode === 200) {
                console.log(responsePayload);
                // Put the data into the forms as values where needed
                document.querySelector("#userAccountEdit input[name=email]").value = responsePayload.email;
                document.querySelector("#userAccountEdit input[name=name]").value = responsePayload.name;
                document.querySelector("#userAccountEdit input[name=indexNumber]").value = responsePayload.indexNumber;
            } else {
                // If the request comes back as something other than 200, log the user our.
                auth.logUserOut(httpClient).then(() => {
                    window.location = "/";
                });
            }

            queryStringObject = { index: responsePayload.indexNumber };
            const requestPayload = { path: "/api/performance", method: "GET", queryStringObject };

            // Fetch the menu data.
            httpClient.request(requestPayload).then(({ statusCode, responsePayload }) => {
                console.log(responsePayload);

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
                    table.style.padding = "20px";
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
        });
};

// Callback that is being called once userAccountEdit is successfully submit.
userAccountEdit.formSuccessProcessor = ({ detail: { formId, requestPayload, responsePayload } }) => {
    // If forms saved successfully and they have success messages, show them.
    document.querySelector("#userAccountEdit .formSuccess").style.display = "block";
    document.querySelector(`#${formId} .formSuccess`).innerHTML = "Updated details successfully";
};

// Init user current page.
userAccountEdit.init = () => {
    // Preload data for the current page.
    userAccountEdit.preloadData();

    // Subscribe to form events.
    document.addEventListener("userAccountEditFormSuccess", userAccountEdit.formSuccessProcessor);
};

// Call the init processes after the window loads
window.addEventListener("load", userAccountEdit.init);
