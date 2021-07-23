/**
 * Library for storing and editing data.
 */

// Dependencies.
const fs = require("fs");
const path = require("path");
const util = require("util");
const jsonStringToObject = require("./jsonStringToObject");

// Promisify file system functions to avoid to callback-inside-callback situation.
const fsOpen = util.promisify(fs.open);
const fsWrite = util.promisify(fs.write);
const fsClose = util.promisify(fs.close);

// Container for the module (to be exported).
const database = {};

// Base directory of the data folder.
database.baseDirectory = path.join(__dirname, "/../../.data/");

/**
 * Write date to a file.
 * @param {string} directory
 * @param {string} file
 * @param {*} data
 * @return {Promise}
 */
database.create = async (directory, file, data) => {
    // Open the file for writing.
    const fileDescriptor = await fsOpen(`${database.baseDirectory}${directory}/${file}.json`, "wx");

    // Convert data to string.
    const stringData = JSON.stringify(data);

    // Write to file and close it.
    await fsWrite(fileDescriptor, stringData);
    await fsClose(fileDescriptor);
};

//output file
// let outfile='nidah.png';
// let buff = new Buffer.from(frombase64.split(",")[1],"base64");
// fsWrite(outfile,buff);
// console.log('file saved as nidah.png');


// Export the module.
module.exports = database;
