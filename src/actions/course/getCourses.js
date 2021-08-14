// Dependencies.
const connection = require("../../db");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get courses info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getCourses = async (requestData) => {
    const db = connection.getDb();

    const cluster = validator.parseString(requestData.queryStringObject.cluster);
    if (!cluster) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Lookup the courses.
    let courses;
    try {
        cursor = await db.collection("courses").find({ cluster });
        courses = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    console.log(courses);

    return new ResponseContainer(200, courses);
};

// Export module.
module.exports = getCourses;
