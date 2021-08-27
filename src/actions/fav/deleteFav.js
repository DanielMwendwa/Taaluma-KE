// Dependencies.
const connection = require("../../db");
const validator = require("../../lib/validator");
const verifyUserToken = require("../token/verifyUserToken");
const User = require("../../models/User");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Delete user.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const deleteFav = async (requestData) => {
    const db = connection.getDb();

    // Check that the email is valid.
    const email = validator.parseEmail(requestData.queryStringObject.email);
    if (!email) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Lookup the user.
    let userData;
    try {
        userData = await db.collection("users").findOne({email})
    } catch (e) {
        console.error(e);
    }

    // Create user instance.
    const user = new User().fromSnapshot(userData);
    try {
        await db.collection("users").deleteOne({email: user.email});
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200);
};

// Export module.
module.exports = deleteFav;
