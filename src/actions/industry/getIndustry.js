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

    // let career_data;
    // try {
    //     career_data = await db.collection("career_data").find();
    // } catch (e) {
    //     console.error(e);
    // }
    // console.log(career_data)

    let career_data;
    let projection = { _id: 0 };
    try {
        cursor = await db.collection("career_data").find().project(projection);
        career_data = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    industry.careers.forEach((doc) => {
        doc.desc = career_data.find((x) => x.Code === doc.code).Description;
    });

    return new ResponseContainer(200, industry);
};

// Export module.
module.exports = getIndustries;
