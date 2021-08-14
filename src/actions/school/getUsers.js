// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get user info.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getUsers = async (requestData) => {
    const db = connection.getDb();

    // Lookup the users.
    let users;
    let projection = {hashedPassword: 0}
    try {
        cursor = await db.collection("school").find().project(projection);
        users = await cursor.toArray();
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200, users);
};

// Export module.
module.exports = getUsers;