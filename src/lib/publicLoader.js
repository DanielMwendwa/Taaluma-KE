/**
 * Module that is responsible for loading public items by name.
 */

// Dependencies.
const fs = require("fs");
const path = require("path");
const util = require("util");

// Promisify file system functions to avoid to callback-inside-callback situation.
const fsReadFile = util.promisify(fs.readFile);

/**
 * Public loader function.
 * @param {string} publicName
 * @return {Promise<Buffer|string|boolean>}
 */
const publicLoader = async (publicName) => {
    // Check that template name is valid.
    publicName = typeof publicName === "string" && publicName.length > 0 ? publicName : false;
    if (!publicName) {
        return false;
    }

    // Set up public base directory.
    const publicDir = path.join(__dirname, "/../public/");

    // Try to read the requested public item.
    const publicString = await fsReadFile(`${publicDir}${publicName}`);

    if (!publicString) {
        // public item could not be loaded.
        return false;
    }

    return publicString;
};

// Export the module.
module.exports = publicLoader;
