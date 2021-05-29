// Dependencies.
const connection = require("../../db");
const Token = require("../../models/Token");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Read token.
 * @param { RequestData } requestData
 * @return { Promise }
 */
const getToken = async (requestData) => {
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
        return new ResponseContainer(404);
    }

    // Create token instance.
    const token = new Token().fromSnapshot(tokenData);
    return new ResponseContainer(200, token.toObject());
};

// Export module.
module.exports = getToken;
