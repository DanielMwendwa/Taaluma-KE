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
 * Create career work activities.
 * @param {object} requestData
 * @return {Promise}
 */

const postAct = async (requestData) => {
    console.log(requestData)
    const db = connection.getDb();

    // Get raw alternate title request data.
    let work_activity = requestData.payload;

    // Query for a alt title that has the given alt title
    const query = { activity: capitalizeTheFirstLetterOfEachWord(work_activity.activity) };

    // Make sure that the alt title doesn't already exists.
    let actData;
    try {
        actData = await db.collection("activities").findOne(query);
    } catch (e) {
        console.error(e);
    }

    if (actData) {
        return new ResponseContainer(400, { error: "A work_activity with that title already exists" });
    }

    // Store the alternate title.
    try {
        work_activity.activity = capitalizeTheFirstLetterOfEachWord(work_activity.activity);
        await db.collection("activities").insertOne(work_activity);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, work_activity);
};

// Export module.
module.exports = postAct;
