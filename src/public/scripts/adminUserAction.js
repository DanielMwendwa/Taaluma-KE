// Init page module object.
const user = {};

// Cached menu items.
// user.users = [];

user.tags = [];

// Data preloader.
user.preloadData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("id");
    const queryStringObject = { email };
    const requestPayload = { path: "/api/users", queryStringObject };
    const getRequestPayload = { method: "GET", ...requestPayload };
    const deleteRequestPayload = { method: "DELETE", ...requestPayload };

    // Fetch the menu data.
    httpClient.request(getRequestPayload).then(({ statusCode, responsePayload }) => {
        console.log(responsePayload);
        let name = responsePayload.name;
        let email = responsePayload.email;
        let indexNumber = responsePayload.indexNumber;
        let isAdmin = responsePayload.isAdmin;

        // Put the data into the forms as values where needed
        document.querySelector("#adminUserAction input[name=name]").value = name;
        document.querySelector("#adminUserAction input[name=email]").value = email;
        document.querySelector("#adminUserAction input[name=indexNumber]").value = indexNumber;
        if (isAdmin) {
            document.querySelector("#adminUserAction input[name=isAdmin]").value = "YES";
        } else {
            document.querySelector("#adminUserAction input[name=isAdmin]").value = "NO";
        }
    });

    document.getElementById("delete-user").addEventListener("click", (event) => {
        alert("Are you sure you want to delete the user")
        httpClient.request(deleteRequestPayload).then(({ statusCode, responsePayload }) => {
            if (statusCode == 200) {
                window.location = "/admin/dashboard";
            }
        });
    });
};

// Init user current page.
user.init = () => {
    // Preload data for the current page.
    user.preloadData();
};

// Call the init processes after the window loads
window.addEventListener("load", user.init);
