// Dependencies.
const connection = require("../../db");
const validator = require("../../lib/validator");
const verifyUserToken = require("../token/verifyUserToken");
const User = require("../../models/User");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Update user.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const putUser = async (requestData) => {
    const db = connection.getDb();

    // Check for the required field.
    const email = validator.parseEmail(requestData.payload.email);
    if (!email) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Get the token from the headers.
    // const token = validator.parseString(requestData.headers.token);

    // // Verify that the given token is valid for the phone number.
    // const verifiedToken = await verifyUserToken(token, email);
    // if (!verifiedToken) {
    //     return new ResponseContainer(403, { error: "Missing required token in header or token is invalid" });
    // }

    // Lookup the user.
    let userData;
    try {
        userData = await db.collection("users").findOne({ email });
    } catch (e) {
        console.error(e);
    }

    // Create user instance.
    const user = new User().fromSnapshot(userData);

    // Update user data.
    user.updateFromObject(requestData.payload);

    // Create a filter for a doc to update
    const filter = { email };

    // Create a document that sets the changed values
    const updateDoc = {
        $set: { ...user },
    };

    // This option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    try {
        await db.collection("users").updateOne(filter, updateDoc, options);
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, user.toObject());
};

// Export module.
module.exports = putUser;
