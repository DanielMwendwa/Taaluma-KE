/**
 * Frontend logic for application.
 */

// Container for frontend application.
const app = {};

// Bind the logout button.
app.bindLogoutButton = () => {
    document.getElementById("logoutButton").addEventListener("click", (event) => {
        // Stop it from redirecting anywhere
        event.preventDefault();
        // Log the user out
        auth.logUserOut(httpClient).then(() => {
            window.location = "/";
        });
    });
};

// Set (or remove) the loggedIn class from the body.
app.setLoggedInClass = (isLoggedIn) => {
    const target = document.querySelector("body");
    if (isLoggedIn) {
        target.classList.remove("loggedOut");
        target.classList.add("loggedIn");
    } else {
        target.classList.remove("loggedIn");
        target.classList.add("loggedOut");
    }
};

// Set (or remove) the admin class from the body.
app.setAdminClass = (isAdmin) => {
    const targets = document.querySelectorAll(".appAdmin");
    targets.forEach((target) => {
        if (isAdmin) {
            target.style.display = "block";
        } else {
            target.style.display = "none";
        }
    });
};

// Verify whether the signed in user is an administrator.
app.verifyUserIsAdmin = (token) => {
    const queryStringObject = { email: token.email };
    httpClient
        .request({ headers: { token: token._id }, path: "/api/users", method: "GET", queryStringObject })
        .then(({ statusCode, responsePayload }) => {
            app.setAdminClass(responsePayload.isAdmin);
        });
};

// Init (bootstrapping).
app.init = () => {
    // Get the token.
    const token = auth.getToken();
    app.setLoggedInClass(!!token);
    app.verifyUserIsAdmin(token);

    if (token) {
        // Set token to the http client default headers.
        httpClient.defaults.headers = { token: token.id };
    }

    // Bind logout button.
    app.bindLogoutButton();

    // Bind all form submissions.
    formProcessor.bindForms(httpClient);
};

// Call the init processes after the window loads.
window.addEventListener("load", app.init);
