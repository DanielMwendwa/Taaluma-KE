// Dependencies.
const connection = require("../../db");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postLogs = async (requestData) => {
    const db = connection.getDb();
    // Get raw user request data.
    const data = requestData.payload;
    if (data.method == "PUT") {
        data.code = 204; // resource updated successfully
    }
    if (data.method == "POST") {
        data.code = 201; // resource created successfully
    }
    let url = new URL(data.route);
    data.route = url.pathname;

    let user;
    if (data.user) {
        user = data.user;
    } else {
        // Lookup the token.
        let tokenData;
        try {
            tokenData = await db.collection("tokens").findOne({ _id: requestData.headers.token });
        } catch (e) {
            console.error(e);
        }
        user = tokenData.email;
    }

    let logs = {
        address: "127.0.0.1",
        timestamp: new Date(),
        user: user,
        ...data,
    };

    try {
        await db.collection("logs").insertOne(logs);
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200);
};

// Export module.
module.exports = postLogs;
