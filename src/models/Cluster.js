/**
 * Class User.
 * Describes main User related fields and their validation rules.
 */
class Cluster {
    /**
     * Create programme instance from object.
     * @param {string} name - Cluster name.
     * @param {string} programmes - Cluster programmes.
     * @return {Cluster}
     */
    fromObject({ name, programmes }) {
        this.name = validator.parseString(name);
        this.programmes = validator.parseString(programmes);

        // Return self instance.
        return this;
    }

    /**
     * Create user instance from database snapshot.
     * @param {string} name - User name.
     * @param {string} email - User email.
     * @return {User}
     */
    fromSnapshot({ name, email, hashedPassword }) {
        this.name = name;
        this.email = email;
        this.hashedPassword = hashedPassword;

        // Return self instance.
        return this;
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
        };
    }
}

// Export the module.
module.exports = Cluster;
