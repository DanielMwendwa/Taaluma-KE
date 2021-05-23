/**
 * Industries request handlers.
 */

// Dependencies.
const getIndustries = require("../actions/onet/getIndustries");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Industries controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
industriesController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getIndustries(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = industriesController;
