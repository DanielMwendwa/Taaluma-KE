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
     * @param {string} indexNumber - User index number.
     * @param {boolean} isAdmin - Whether User is admin.
     * @param {string} account - Student/school account
     * @return {User}
     */
    fromObject({ name, email, password, indexNumber = null, isAdmin = false, account = "student"  }) {
        this.name = validator.parseString(name);
        this.email = validator.parseEmail(email);
        this.hashedPassword = passwordHash(validator.parseString(password));
        if (indexNumber) {
            indexNumber = parseInt(indexNumber)
            this.indexNumber = validator.parsePositiveInteger(indexNumber);
        } else {
            this.indexNumber = indexNumber;
        }

        if (typeof isAdmin == "string") {
            if (isAdmin.toLowerCase() == "yes") {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        } else {
            this.isAdmin = isAdmin;
        }

        this.account = validator.parseString(account);

        // Return self instance.
        return this;
    }

    /**
     * Create user instance from database snapshot.
     * @param {string} name - User name.
     * @param {string} email - User email.
     * @param {string} hashedPassword - Hashed user password.
     * @param {string} indexNumber - User index number.
     * @param {boolean} isAdmin - Whether User is admin.
     * @param {string} account - Student/school account
     * @return {User}
     */
    fromSnapshot({ name, email, hashedPassword, indexNumber, isAdmin, account }) {
        this.name = name;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.indexNumber = indexNumber;
        this.isAdmin = isAdmin;
        this.account = account;

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
     * @param {string} [indexNumber]
     */
    updateFromObject({ name, password, indexNumber, isAdmin, account}) {
        const parsedName = validator.parseString(name);
        const parsedHashedPassword = passwordHash(validator.parseString(password));
        const parsedIndexNumber = validator.parsePositiveInteger(parseInt(indexNumber));
        const parsedIsAdmin = validator.parseString(isAdmin);
        const parsedAccount = validator.parseString(account);

        if (parsedName) {
            this.name = parsedName;
        }

        if (parsedHashedPassword) {
            this.hashedPassword = parsedHashedPassword;
        }

        if (parsedIndexNumber) {
            this.indexNumber = parsedIndexNumber;
        }

        if (parsedIsAdmin) {
            if (parsedIsAdmin.toLowerCase() == "yes") {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        }

        if (parsedAccount) {
            this.account = parsedAccount;
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
            indexNumber: this.indexNumber,
            isAdmin: this.isAdmin,
            account: this.account
        };
    }
}

// Export the module.
module.exports = User;
