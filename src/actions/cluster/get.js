// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get clusters info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getClusters = async (requestData) => {
    const db = connection.getDb();

    // Lookup the clusters.
    let clusters;
    let projection = {careers: 0, _id: 0}
    try {
        cursor = await db.collection("clusters").find().project(projection);
        clusters = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, clusters);
};

// Export module.
module.exports = getClusters;
