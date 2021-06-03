// Dependencies.
const validator = require("../lib/validator");
const passwordHash = require("../lib/passwordHash");

/**
 * Class User.
 * Describes main User related fields and their validation rules.
 */
class Industry {
    /**
     * Create Industry instance from object.
     * @param {string} code - Industry code.
     * @param {string} title - Industry title.
     * @param {string} careers - Industry careers.
     * @return {Industry}
     */
    fromObject({ code, title, careers }) {
        this.code = validator.parseString(code);
        this.title = validator.parseString(title);
        this.careers = careers;

        // Return self instance.
        return this;
    }

    /**
     * Create Industry instance from database snapshot.
     * @param {string} code - Industry code.
     * @param {string} title - Industry title.
     * @param {string} careers - Industry careers.
     * @return {Industry}
     */
    fromSnapshot({ code, title, careers=[] }) {
        this.code = code;
        this.title = title;
        this.careers = careers;

        // Return self instance.
        return this;
    }

    /**
     * Update user instance with new values.
     * @param {string} [code]
     * @param {string} [title]
     * @param {string} [careers]
     */
    updateFromObject({ title, careers }) {
        const parsedTitle = validator.parseString(title);
        const parsedCareers = careers;

        if (parsedTitle) {
            this.title = parsedTitle;
        }

        if (parsedCareers) {
            this.careers = parsedCareers;
        }
    }

    /**
     * Create public representation of the industry.
     * @return {object}
     */
    toObject() {
        return {
            code: this.code,
            title: this.title,
            careers: this.careers
        };
    }
}

// Export the module.
module.exports = Industry;
