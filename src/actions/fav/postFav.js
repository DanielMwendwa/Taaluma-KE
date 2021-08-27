// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postLogs = async (requestData) => {
    const db = connection.getDb();
    // Get raw user request data.
    const data = requestData.payload;

    try {
        await db.collection("fav_career").insertOne(data);
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200);
};

// Export module.
module.exports = postLogs;
