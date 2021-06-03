// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");
const mailgun = require("../../lib/mailgun")

/**
 * Get industries info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getIndustries = async (requestData) => {
    const db = connection.getDb();

    // try {
    //     await mailgun.sendEmail("nidahcarlos@gmail.com", "Taaluma", "message");
    // } catch (error) {
    //     console.log(error)
    // }

    // Lookup the industries.
    let industries;
    let projection = {careers: 0, _id: 0}
    try {
        cursor = await db.collection("industries").find().project(projection);
        industries = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, industries);
};

// Export module.
module.exports = getIndustries;
