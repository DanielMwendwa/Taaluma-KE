/**
 * Career request handlers.
 */

// Dependencies.
const getCareers = require("../actions/career/getCareers");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Career controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
careersController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getCareers(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = careersController;
