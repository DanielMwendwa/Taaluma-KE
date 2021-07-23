// Dependencies.
const connection = require("../../db");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get career info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getCareer = async (requestData) => {
    const db = connection.getDb();

    const career_code = validator.parseString(requestData.queryStringObject.code);
    if (!career_code) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Lookup the career.
    let career;
    try {
        career = await db.collection("career_data").findOne({ Code: career_code });
    } catch (e) {
        console.error(e);
    }

    let alternate_titles;
    let projection = {_id: 0}
    try {
        cursor = await db.collection("alternate_titles").find({code: career_code}).project(projection);
        alternate_titles = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }
    alternate_titles = alternate_titles.map((item) => item["alternate_title"]);

    let work_activities;
    try {
        cursor = await db.collection("activities").find({code: career_code}).project(projection);
        work_activities = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }
    work_activities = work_activities.map((item) => item["activity"]);

    let education;
    try {
        cursor = await db.collection("course_map").find({"career-code": career_code}).project(projection);
        education = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }
    education = education.map((item) => item["education"]);

    let career_data = {...career, alternate_titles, work_activities, education}

    return new ResponseContainer(200, career_data);
};

// Export module.
module.exports = getCareer;
