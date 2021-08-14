// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */

const postUser = async (requestData) => {
    const db = connection.getDb();

    // Get raw user request data.
    const user = requestData.payload;

    // Make sure that the user doesn't already exists.
    let userData;
    try {
        userData = await db.collection("school").findOne({email: user.email})
    } catch (e) {
        console.error(e);
    }
    if (userData) {
        return new ResponseContainer(400, {error: "A user with that email already exists"});
    }

    if (user.confirmPassword) {
        if (user.password !== user.confirmPassword) {
            return new ResponseContainer(400, {error: "Passwords Don't Match"});
        }    
    }

    // Store the user.
    try {
        await db.collection("school").insertOne(user);
    } catch (e) {
        console.error(e);
    }
    return new ResponseContainer(200, user);
};

// Export module.
module.exports = postUser;
