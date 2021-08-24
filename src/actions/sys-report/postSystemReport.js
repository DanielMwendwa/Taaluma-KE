// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postSystemReport = async (requestData) => {
    const db = connection.getDb();
    // Get raw user request data.
    const logs = requestData.payload;

    try {
        await db.collection("reports").insertOne(logs);
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200);
};

// Export module.
module.exports = postSystemReport;
