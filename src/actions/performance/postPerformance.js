// Dependencies.
const connection = require("../../db");
const filterByReference = require("../../lib/filters");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postPerformance = async (requestData) => {
    const db = connection.getDb();

    // Get raw user request data.
    let performance = JSON.parse(requestData.payload);

    let foundItems = [];
    for (let i = 0; i < performance.length; i++) {
        let perfData = await db.collection("performance").findOne({ index: performance[i].index });
        if (perfData) {
            foundItems.push(perfData);
        }
    }

    performance = filterByReference(performance, foundItems)
    if (performance.length == 0) {
        return new ResponseContainer(400, { error: "No data to update" });
    }

    try {
        await db.collection("performance").insertMany(performance);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, performance);
};

// Export module.
module.exports = postPerformance;
