/**
 * Clusters request handlers.
 */

// Dependencies.
const getClusters = require("../actions/cluster/get");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Clusters controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
clustersController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getClusters(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = clustersController;
