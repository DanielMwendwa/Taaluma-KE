// Create form processor container.
const formProcessor = {};

const validateEmail = (email) => {
    // From chromium browser
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// The strong and weak password Regex pattern checker
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const StrengthChecker = (PasswordParameter) => {
    if(strongPassword.test(PasswordParameter)) {
        console.log("Your Password is Strong")
    } else if(mediumPassword.test(PasswordParameter)){
        alert("Your Password is Medium")
        alert("The password should be at least 8 characters long, and contains at least one uppercase letter, one lowercase letter, one digit and one special character");
        return false;
    } else {
        alert("Your Password is Weak")
        alert("The password should be at least 8 characters long, and contains at least one uppercase letter, one lowercase letter, one digit and one special character");
        return false;
    }
}

// Bind the forms.
formProcessor.bindForms = (httpClient) => {
    if (!document.querySelector("form")) {
        // There is nothing to bind to.
        return false;
    }

    // Get all forms.
    const allForms = document.querySelectorAll("form");
    for (let formIndex = 0; formIndex < allForms.length; formIndex++) {
        allForms[formIndex].addEventListener("submit", (event) => {
            // Stop it from submitting.
            event.preventDefault();

            // Get form element.
            const form = event.target;

            // Get form info.
            const formId = form.id;
            const path = form.action;
            let method = form.method.toUpperCase();

            // Hide the error message (if it's currently shown due to a previous error).
            document.querySelector(`#${formId} .formError`).style.display = "none";

            // Hide the success message (if it's currently shown due to a previous error).
            if (document.querySelector(`#${formId} .formSuccess`)) {
                document.querySelector(`#${formId} .formSuccess`).style.display = "none";
            }

            // Turn the inputs into a payload.
            const payload = {};
            form.querySelectorAll("input").forEach((element) => {
                // Override the method of the form if the input's name is _method.
                if (element.name === "_method") {
                    method = element.value.toUpperCase();
                } else if (element.type !== "submit") {
                    let nameOfElement = element.name;
                    // Get element value depending on its type.
                    let valueOfElement = element.type === "checkbox" ? element.checked : element.value;
                    // Convert strings to numbers if is required.
                    if (element.classList.contains("number")) {
                        valueOfElement = parseInt(valueOfElement);
                    }
                    // Validate email
                    if (element.type == "email") {
                        if (!validateEmail(valueOfElement)) {
                            alert("Invalid Email Address");
                            return;
                        }
                    }
                    if (element.type == "password" && nameOfElement == "password" && formId == "userSchoolAccountCreate") {
                        StrengthChecker(valueOfElement);
                    }
                    payload[nameOfElement] = valueOfElement;
                }
            });

            if (form.querySelector("select")) {
                form.querySelectorAll("select#career-selector").forEach((element) => {
                    if (element.name == "career") {
                        payload.title = element.value;
                        payload.code = element.options[element.selectedIndex].id;
                    }
                });
            }

            // If the method is DELETE, the payload should be a queryStringObject instead.
            const queryStringObject = method === "DELETE" ? payload : {};
            let requestObj = { path, method, queryStringObject, payload };
            // Call the API.
            httpClient.request(requestObj).then(({ statusCode, responsePayload }) => {
                let logsUser = "";
                if (requestObj.payload.email) {
                    logsUser = requestObj.payload.email;
                }
                httpClient
                    .request({
                        path: "/api/logs",
                        method: "POST",
                        payload: { event: formId, method: requestObj.method, route: requestObj.path, code: statusCode, user: logsUser },
                    })
                    .then(({ statusCode2, responsePayload2 }) => {
                        console.log(statusCode2);
                        switch (statusCode) {
                            case 200:
                                // If successful, send to form response processor.
                                formProcessor.formResponseProcessor(formId, payload, responsePayload);
                                break;
        
                            default:
                                // Try to get the error from the api, or set a default error message.
                                const error =
                                    typeof responsePayload.error === "string"
                                        ? responsePayload.error
                                        : "An error has occured, please try again";
        
                                // Set the formError field with the error text.
                                document.querySelector(`#${formId} .formError`).innerHTML = error;
                                document.querySelector(`#${formId} .formError`).style.display = "block";
                        }
                    });
            });
        });
    }
};

// Form response processor.
formProcessor.formResponseProcessor = (formId, requestPayload, responsePayload) => {
    // Dispatch the event.
    const formSuccessEvent = new CustomEvent(`${formId}FormSuccess`, {
        detail: { formId, requestPayload, responsePayload },
    });
    document.dispatchEvent(formSuccessEvent);
};
