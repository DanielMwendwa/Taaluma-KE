/**
 * Frontend logic for application.
 */

// Container for frontend application.
const userDashboard = {};

// Set (or remove) the school account class from the body.
userDashboard.setSchoolAccountClass = (responsePayload) => {
    const targets = document.querySelectorAll(".schoolAccount");
    targets.forEach((target) => {
        if (responsePayload.account == "school" || responsePayload.isAdmin) {
            target.style.display = "block";
        } else {
            target.style.display = "none";
        }
    });
};

// Verify whether the signed in user with a school account.
userDashboard.verifySchoolAccount = (token) => {
    const queryStringObject = { email: token.email };
    httpClient
        .request({ headers: { token: token._id }, path: "/api/users", method: "GET", queryStringObject })
        .then(({ statusCode, responsePayload }) => {
            console.log(responsePayload)
            userDashboard.setSchoolAccountClass(responsePayload);
        });
};

// Init (bootstrapping).
userDashboard.init = () => {
    // Get the token.
    const token = auth.getToken();
    userDashboard.verifySchoolAccount(token);
};

// Call the init processes after the window loads.
window.addEventListener("load", userDashboard.init);
