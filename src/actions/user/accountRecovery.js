// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");
const randomInteger = require("../../lib/randomInteger");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postUser = async (requestData) => {
    const db = connection.getDb();

    // Get raw user request data.
    const email = requestData.payload; //TODO: Validate Email

    // Find if user is registered

    try {
        await db.collection("account").createIndex({ "createdAt": 1 }, { expireAfterSeconds: 60 })
    } catch (e) {
        console.error(e);
    }

    const code = randomInteger();
    const emailAndCode = {email, code}
    const query = { email };
    const update = { $set: { ...emailAndCode, "createdAt": new Date() }};
    const options = { upsert: true };

    // Store the email and code.
    try {
        await db.collection("account").updateOne(query, update, options);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, email);
};

// Export module.
module.exports = postUser;
