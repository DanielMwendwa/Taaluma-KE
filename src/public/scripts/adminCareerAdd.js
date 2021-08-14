// Init page module object.
const adminCareerAdd = {};

// Callback that is being called once userAccountEdit is successfully submit.
adminCareerAdd.formSuccessProcessor = ({ detail: { formId, requestPayload, responsePayload } }) => {
    // If forms saved successfully and they have success messages, show them.
    alert("your data has been saved successfully");
    window.location = "/admin/dashboard/careers";
};

// Init user current page.
adminCareerAdd.init = () => {
    // Subscribe to form events.
    document.addEventListener("adminCareerAddFormSuccess", adminCareerAdd.formSuccessProcessor);
};

// Call the init processes after the window loads
window.addEventListener("load", adminCareerAdd.init);
