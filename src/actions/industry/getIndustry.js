// Dependencies.
const connection = require("../../db");
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
    let projection = {title: 1, careers: 1, _id: 0}
    try {
        industry = await db.collection("industries").findOne({code}).project(projection);
    } catch (e) {
        console.error(e);
    }
    

    return new ResponseContainer(200, industry);
};

// Export module.
module.exports = getIndustries;
