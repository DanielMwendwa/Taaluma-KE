// Dependencies.
const connection = require("../../db");
const User = require("../../models/User");
const ResponseContainer = require("../../models/ResponseContainer");
const config = require("../../config")

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postUser = async (requestData) => {
    const db = connection.getDb();
    
    // Get raw user request data.
    const userRawData = requestData.payload;

    // Create User instance from raw data.
    const user = new User().fromObject(userRawData);

    // Check if user instance has all required fields.
    if (!user.isValid()) {
        return new ResponseContainer(400, {error: "Missing required fields"});
    }

    // Make sure that the user doesn't already exists.
    let userData;
    try {
        userData = await db.collection("users").findOne({email: user.email})
    } catch (e) {
        console.error(e);
    }

    if (config.appAdmins.includes(user.email)) {
        user.isAdmin = true;
    }
    
    if (userData) {
        return new ResponseContainer(400, {error: "A user with that email already exists"});
    }

    const verified = user.verifyPassword(userRawData.confirmPassword);
    if (!verified) {
        return new ResponseContainer(400, {error: "Passwords Don't Match"});
    }
    
    // Store the user.
    try {
        await db.collection("users").insertOne(user);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, user.toObject());
};

// Export module.
module.exports = postUser;
