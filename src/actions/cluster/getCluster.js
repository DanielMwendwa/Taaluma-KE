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

    // Lookup the cluster.
    let courses;
    let projection = {_id: 0}
    try {
        cursor = await db.collection("courses").find({cluster}).project(projection);
        courses = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, courses);
};

// Export module.
module.exports = getCluster;
