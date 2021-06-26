// Dependencies.
const connection = require("../../db");
const verifyUserToken = require("../token/verifyUserToken");
const User = require("../../models/User");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");
/**
 * Get user info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getUser = async (requestData) => {
    const db = connection.getDb();

    // Check that the email is valid.
    const email = validator.parseEmail(requestData.queryStringObject.email);
    if (!email) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Get the token from the headers.
    const token = validator.parseString(requestData.headers.token);

    // Verify that the given token is valid for the email address.
    const verifiedToken = await verifyUserToken(token, email);
    if (!verifiedToken) {
        return new ResponseContainer(403, { error: "Missing required token in header or token is invalid" });
    }

    // Lookup the user.
    let userData;
    try {
        userData = await db.collection("users").findOne({ email });
    } catch (e) {
        console.error(e);
    }

    // Create user instance.
    const user = new User().fromSnapshot(userData);
    return new ResponseContainer(200, user.toObject());
};

// Export module.
module.exports = getUser;
