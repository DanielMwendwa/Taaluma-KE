/**
 * Industries request handlers.
 */

// Dependencies.
const getCluster = require("../actions/cluster/getCluster");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Industries controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
clusterController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getCluster(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = clusterController;

