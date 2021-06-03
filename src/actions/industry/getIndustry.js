// Dependencies.
const connection = require("../../db");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get industries info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getIndustries = async (requestData) => {
    const db = connection.getDb();

    const code = validator.parseString(requestData.queryStringObject.code);
    if (!code) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Lookup the industry.
    let industry;
    try {
        industry = await db.collection("industries").findOne({ code });
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, industry);
};

// Export module.
module.exports = getIndustries;
