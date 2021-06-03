// Dependencies.
const validator = require("../lib/validator");
const passwordHash = require("../lib/passwordHash");
const randomString = require("../lib/randomString");
const config = require("../config");

// Define constants.
const tokenIdLength = 20;
const tokenLifeTime = config.tokenLifetime;

/**
 * Class Token.
 */
class Token {
    /**
     * Create token instance from object.
     * @param {string} email
     * @param {string} password
     * @return {Token}
     */
    fromObject({ email, password }) {
        this.email = validator.parseEmail(email);
        this.hashedPassword = passwordHash(validator.parseString(password));
        this._id = randomString(tokenIdLength);
        this.expires = Date.now() + tokenLifeTime;

        // Return self instance.
        return this;
    }

    /**
     * Create token object from database snapshot.
     * @param {string} email
     * @param {string} hashedPassword
     * @param {string} _id
     * @param {boolean} expires
     * @return {Token}
     */
    fromSnapshot({ email, hashedPassword, _id, expires }) {
        this.email = email;
        this.hashedPassword = hashedPassword;
        this._id = _id;
        this.expires = expires;

        // Return self instance.
        return this;
    }

    /**
     * Checks if token data is valid.
     * @return {boolean}
     */
    isValid() {
        return this.email && this.hashedPassword && this._id && this.expires;
    }

    /**
     * Check if token is already expired.
     * @return {boolean}
     */
    isExpired() {
        return this.expires <= Date.now();
    }

    /**
     * Prolong token.
     * @return {boolean}
     */
    prolong() {
        this.expires = Date.now() + tokenLifeTime;
    }

    /**
     * Generate public version of token object.
     * @return {object}
     */
    toObject() {
        return {
            email: this.email,
            _id: this._id,
            expires: this.expires,
        };
    }
}

// Export the module.
module.exports = Token;
