// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
}

/**
 * Create alt title.
 * @param {object} requestData
 * @return {Promise}
 */

const postAltTitle = async (requestData) => {
    const db = connection.getDb();

    // Get raw alternate title request data.
    let alt_title = requestData.payload;

    // Query for a alt title that has the given alt title
    const query = { alternate_title: capitalizeTheFirstLetterOfEachWord(alt_title.alternate_title) };

    // Make sure that the alt title doesn't already exists.
    let altTitleData;
    try {
        altTitleData = await db.collection("alternate_titles").findOne(query);
    } catch (e) {
        console.error(e);
    }

    if (altTitleData) {
        return new ResponseContainer(400, { error: "A alt_title with that title already exists" });
    }

    // Store the alternate title.
    try {
        alt_title.alternate_title = capitalizeTheFirstLetterOfEachWord(alt_title.alternate_title);
        await db.collection("alternate_titles").insertOne(alt_title);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, alt_title);
};

// Export module.
module.exports = postAltTitle;
