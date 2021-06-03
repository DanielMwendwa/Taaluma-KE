// Init page module object.
const userSessionCreate = {};

// Callback that is being called once userAccountEdit is successfully submit.
userSessionCreate.formSuccessProcessor = ({ detail: { formId, requestPayload, responsePayload } }) => {
    // If forms saved successfully and they have success messages, show them.
    auth.setToken(responsePayload);
    // window.location = "/user/dashboard";
    window.location = "/industries";
};

accountRecovery.formSuccessProcessor = ({ detail: { formId, requestPayload, responsePayload } }) => {
    // If forms saved successfully and they have success messages, show them.
    window.location = `/account/recovery?email=${responsePayload.email}`;
};

// Init user current page.
userSessionCreate.init = () => {
    // Subscribe to form events.
    document.addEventListener("userSessionCreateFormSuccess", userSessionCreate.formSuccessProcessor);
    document.addEventListener("accountRecoveryFormSuccess", accountRecovery.formSuccessProcessor);
};

// Call the init processes after the window loads
window.addEventListener("load", userSessionCreate.init);
