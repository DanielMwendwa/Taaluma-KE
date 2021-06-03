// Init page module object.
const accountRecovery = {};

// Callback that is being called once accountRecovery is successfully submit.
accountRecovery.formSuccessProcessor = ({ detail: { formId, requestPayload, responsePayload } }) => {
    // If forms saved successfully and they have success messages, show them.
    // auth.setToken(responsePayload);
    console.log(responsePayload)
    window.location = "/industries";
};

// Init user current page.
accountRecovery.init = () => {
    // Subscribe to form events.
    document.addEventListener("accountRecoveryFormSuccess", accountRecovery.formSuccessProcessor);
};

// Call the init processes after the window loads
window.addEventListener("load", accountRecovery.init);
