/**
 * Account recovery request handlers.
 */

// Dependencies.
const postUserDetails = require("../actions/user/accountRecovery");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Account recovery controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
accountRecoveryController = async (requestData) => {
    switch (requestData.method) {
        case "post":
            return await postUserDetails(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = accountRecoveryController;
