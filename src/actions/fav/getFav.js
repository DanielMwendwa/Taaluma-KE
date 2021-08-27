// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get logs info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getFav = async (requestData) => {
    const db = connection.getDb();

    // Lookup the favourite user career.
    let favUserCareer;
    let projection = { _id: 0 };
    try {
        cursor = await db.collection("fav_career").find().project(projection);
        favUserCareer = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, favUserCareer);
};

// Export module.
module.exports = getFav;
