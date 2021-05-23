// Dependencies.
const connection = require("../../db");
const Token = require("../../models/Token");

/**
 * Verify if a given token id is valid and not expired.
 * @param { string } id - Token id.
 * @return { Promise<boolean | Token> }
 */
const verifyToken = async (id) => {
    const db = connection.getDb();

    // Lookup the token.
    let tokenData;
    try {
        tokenData = await db.collection("tokens").findOne({id})
    } catch (e) {
        console.error(e);
    }

    if (!tokenData) {
        return false;
    }

    // Create token instance.
    const token = new Token().fromSnapshot(tokenData);

    // Check that the token is for given user and has not expired.
    return !token.isExpired() ? token : false;
};

// Export module.
module.exports = verifyToken;
