// Dependencies.
const connection = require("../../db");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get cluster info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getCluster = async (requestData) => {
    const db = connection.getDb();

    const cluster = validator.parseString(requestData.queryStringObject.cluster);
    if (!cluster) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    try {
        clusterData = await db.collection("clusters").findOne({cluster});
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, clusterData);
};

// Export module.
module.exports = getCluster;
