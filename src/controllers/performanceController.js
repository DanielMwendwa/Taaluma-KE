/**
 * Performance request handlers.
 */

// Dependencies.
const putPerformance = require("../actions/performance/putPerformance");
const getPerformance = require("../actions/performance/getPerformance");
const postPerformance = require("../actions/performance/postPerformance");
const deletePerformance = require("../actions/performance/deletePerformance");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Performances controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
performanceController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getPerformance(requestData);

        case "post":
            return await postPerformance(requestData);

        case "put":
            return await putPerformance(requestData);

        case "delete":
            return await deletePerformance(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = performanceController;
