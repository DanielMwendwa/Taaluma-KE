/**
 * Industries request handlers.
 */

// Dependencies.
const getIndustries = require("../actions/industry/getIndustry");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Industries controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
industryController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getIndustries(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = industryController;
