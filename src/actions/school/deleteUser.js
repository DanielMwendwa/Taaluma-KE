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
const deleteUser = async (requestData) => {
    const db = connection.getDb();

    // Check that the email is valid.
    const email = validator.parseEmail(requestData.queryStringObject.email);
    if (!email) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Get the token from the headers.
    // const token = validator.parseString(requestData.headers.token);

    // // Verify that the given token is valid for the give email.
    // const verifiedToken = await verifyUserToken(token, email);
    // if (!verifiedToken) {
    //     return new ResponseContainer(403, { error: "Missing required token in header or token is invalid" });
    // }

    // Lookup the user.
    let userData;
    try {
        userData = await db.collection("school").findOne({email})
    } catch (e) {
        console.error(e);
    }

    // Create user instance.
    const user = new User().fromSnapshot(userData);
    try {
        await db.collection("school").deleteOne({email: user.email});
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200);
};

// Export module.
module.exports = deleteUser;
