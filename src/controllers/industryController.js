/**
 * Industries request handlers.
 */

// Dependencies.
const getIndustry = require("../actions/industry/getIndustry");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Industries controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
industryController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getIndustry(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = industryController;
