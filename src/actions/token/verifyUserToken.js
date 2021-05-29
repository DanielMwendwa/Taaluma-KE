// Dependencies.
const verifyToken = require("./verifyToken");

/**
 * Verify if a given token id is currently valid for a given user.
 * @param { string } _id - Token id.
 * @param { string } email - User email.
 * @return { Promise }
 */
const verifyUserToken = async (_id, email) => {
    // Verify if token is not expired.
    /** @var {Token} */
    const token = await verifyToken(_id);

    // Check that belongs to specific user.
    return token && token.email === email ? token : false;
};

// Export module.
module.exports = verifyUserToken;
