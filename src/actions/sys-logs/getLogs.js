// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get logs info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getLogs = async (requestData) => {
    const db = connection.getDb();

    // Lookup the logs.
    let logs;
    let projection = { _id: 0 };
    try {
        cursor = await db.collection("logs").find().project(projection);
        logs = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, logs);
};

// Export module.
module.exports = getLogs;
