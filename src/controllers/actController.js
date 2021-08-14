/**
 * career activities request handlers.
 */

// Dependencies.
const postAct = require("../actions/career-activities/postAct");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * career activities controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
actController = async (requestData) => {
    switch (requestData.method) {
        case "post":
            return await postAct(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = actController;