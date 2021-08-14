// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create career education.
 * @param {object} requestData
 * @return {Promise}
 */

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomArbitrary = (min = 1, max = 99999) => Math.random() * (max - min) + min;
function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
}

const postEdu = async (requestData) => {
    const db = connection.getDb();
    // Get raw career edu request data.
    let payload = requestData.payload;
    let edu = {};
    edu.education = payload.education;
    edu["career-code"] = payload.code;
    edu.career = payload.title;
    edu["edu-code"] = getRandomArbitrary();

    // Query for a alt title that has the given alt title
    const query = { education: capitalizeTheFirstLetterOfEachWord(edu.education) };

    // Make sure that the alt title doesn't already exists.
    let eduData;
    try {
        eduData = await db.collection("course_map").findOne(query);
    } catch (e) {
        console.error(e);
    }

    if (eduData) {
        return new ResponseContainer(400, { error: "Education with that title already exists" });
    }

    // Store the alternate title.
    try {
        edu.education = capitalizeTheFirstLetterOfEachWord(edu.education);
        await db.collection("course_map").insertOne(edu);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, edu);
};

// Export module.
module.exports = postEdu;
