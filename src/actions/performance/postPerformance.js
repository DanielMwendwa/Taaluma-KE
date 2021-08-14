// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postPerformance = async (requestData) => {
    const db = connection.getDb();

    // Get raw user request data.
    const performance = JSON.parse(requestData.payload);

    // // Make sure that the user doesn't already exists.
    // let userData;
    // try {
    //     userData = await db.collection("users").findOne({ email: user.email });
    // } catch (e) {
    //     console.error(e);
    // }

    // if (userData) {
    //     return new ResponseContainer(400, { error: "A user with that email already exists" });
    // }

    try {
        await db.collection("performance").insertMany(performance);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, performance);
};

// Export module.
module.exports = postPerformance;
