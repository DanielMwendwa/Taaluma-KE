// Dependencies.
const connection = require("../../db");
const Token = require("../../models/Token");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Delete the token.
 * @param { RequestData } requestData
 * @return { Promise }
 */
const deleteToken = async (requestData) => {
    const db = connection.getDb();

    // Check that the id is valid.
    const _id = validator.parseString(requestData.queryStringObject._id);

    if (!_id) {
        return new ResponseContainer(400, { error: "Missing required fields" });
    }

    // Lookup the token.
    let tokenData;
    try {
        tokenData = await db.collection("tokens").findOne({_id})
    } catch (e) {
        console.error(e);
    }
    if (!tokenData) {
        return new ResponseContainer(400, { error: "Could not find the specified token" });
    }

    // Create token instance.
    const token = new Token().fromSnapshot(tokenData);

    // Delete token from database.
    try {
        await db.collection("tokens").deleteOne({_id: token._id});
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200);
};

// Export module.
module.exports = deleteToken;
