// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get careers info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getCareers = async (requestData) => {
    const db = connection.getDb();

    // Lookup the careers.
    let careers;
    let projection = {_id: 0, Description: 0}
    try {
        cursor = await db.collection("career_data").find().project(projection);
        careers = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, careers);
};

// Export module.
module.exports = getCareers;
