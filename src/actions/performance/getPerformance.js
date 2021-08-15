// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get performance info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getPerformance = async (requestData) => {
    const db = connection.getDb();  
    let query = { index: new RegExp(requestData.queryStringObject.school_code) };

    // Lookup the performances.
    const projection = { _id: 0}
    let performance;
    try {
        cursor = await db.collection("performance").find(query).project(projection);
        performance = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, performance);
};

// Export module.
module.exports = getPerformance;