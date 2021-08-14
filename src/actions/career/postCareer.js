// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */

const postCareer = async (requestData) => {
    const db = connection.getDb();

    // Get raw user request data.
    const career = requestData.payload;

    // Make sure that the user doesn't already exists.
    let careerData;
    try {
        careerData = await db.collection("career_data").findOne({Code: career.Code})
    } catch (e) {
        console.error(e);
    }

    if (careerData) {
        return new ResponseContainer(400, {error: "A career with that code already exists"});
    }

    // Store the career.
    try {
        await db.collection("career_data").insertOne(career);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, career);
};

// Export module.
module.exports = postCareer;