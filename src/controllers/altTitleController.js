/**
 * Alternate titles request handlers.
 */

// Dependencies.
const postAltTitle = require("../actions/alt-titles/postAltTitle");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Alternate titles controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
altTitleController = async (requestData) => {
    switch (requestData.method) {
        case "post":
            return await postAltTitle(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = altTitleController;
