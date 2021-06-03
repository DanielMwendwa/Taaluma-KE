/**
 * Create a string of random alphanumeric characters, of a given length.
 * @param {number} intLength
 * @return {integer|null}
 */
const createRandomString = (intLength = 6) => {
    intLength = typeof intLength === "number" && intLength > 0 ? intLength : false;
    if (intLength) {
        // Define all the possible characters that could go into a string.
        const possibleCharacters = "0123456789";

        // Start the final string.
        let int = "";

        for (let i = 0; i < intLength; i += 1) {
            // Get a random character from the possibleCharacters string.
            // Append this character to the final string.
            int += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        }

        // Return the final integer.
        return parseInt(int);
    } else {
        return null;
    }
};

// Export module.
module.exports = createRandomString;
