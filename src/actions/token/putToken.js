// Dependencies.
const connection = require("../../db");
const Token = require("../../models/Token");
const validator = require("../../lib/validator");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Prolong token.
 * @param { RequestData } requestData
 * @return { Promise }
 */
const putToken = async (requestData) => {
    const db = connection.getDb();

    const _id = validator.parseString(requestData.payload._id);
    if (!_id) {
        return new ResponseContainer(400, { error: "Missing required field(s) or field(s) are invalid" });
    }

    // Lookup the token.
    let tokenData;
    try {
        tokenData = await db.collection("tokens").findOne({ _id });
    } catch (e) {
        console.error(e);
    }

    if (!tokenData) {
        return new ResponseContainer(400, { error: "Token does not exists" });
    }

    // Create token instance.
    const token = new Token().fromSnapshot(tokenData);

    // Check to make sure the token isn't already expired.
    if (token.isExpired()) {
        return new ResponseContainer(400, { error: "The token has already expired, and can not be extended" });
    }

    // Set the expiration an hour from now.
    token.prolong();

    // Create a filter for a doc to update
    const filter = { _id };

    // Create a document that sets the changed values
    const updateDoc = {
        $set: { ...token },
    };

    // This option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    // Store the new updates.
    try {
        await db.collection("tokens").updateOne(filter, updateDoc, options);
    } catch (e) {
        console.error(e);
    }

    return new ResponseContainer(200);
};

// Export module.
module.exports = putToken;
