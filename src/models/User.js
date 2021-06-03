// Dependencies.
const validator = require("../lib/validator");
const passwordHash = require("../lib/passwordHash");

/**
 * Class User.
 * Describes main User related fields and their validation rules.
 */
class User {
    /**
     * Create user instance from object.
     * @param {string} name - User name.
     * @param {string} email - User email.
     * @param {string} password - User password.
     * @param {boolean} isAdmin - Whether User is admin.
     * @return {User}
     */
    fromObject({ name, email, password, isAdmin=false }) {
        this.name = validator.parseString(name);
        this.email = validator.parseEmail(email);
        this.hashedPassword = passwordHash(validator.parseString(password));
        this.isAdmin = isAdmin;

        // Return self instance.
        return this;
    }

    /**
     * Create user instance from database snapshot.
     * @param {string} name - User name.
     * @param {string} email - User email.
     * @param {string} hashedPassword - Hashed user password.
     * @param {boolean} isAdmin - Whether User is admin.
     * @return {User}
     */
    fromSnapshot({ name, email, hashedPassword, isAdmin }) {
        this.name = name;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.isAdmin = isAdmin;

        // Return self instance.
        return this;
    }

    /**
     * Check if all user fields are filled and are correct.
     * @return {boolean}
     */
    isValid() {
        return this.name && this.email;
    }

    /**
     * Check if user passwords are the same
     * @param {string} [password]
     * @return {boolean}
     */
    verifyPassword(confirmPassword) {
        return this.hashedPassword === passwordHash(validator.parseString(confirmPassword));
    }

    /**
     * Update user instance with new values.
     * @param {string} [name]
     * @param {string} [password]
     */
    updateFromObject({ name, password }) {
        const parsedName = validator.parseString(name);
        const parsedHashedPassword = passwordHash(validator.parseString(password));

        if (parsedName) {
            this.name = parsedName;
        }

        if (parsedHashedPassword) {
            this.hashedPassword = parsedHashedPassword;
        }
    }

    /**
     * Create public representation of the user.
     * @return {object}
     */
    toObject() {
        return {
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin
        };
    }
}

// Export the module.
module.exports = User;
