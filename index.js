/**
 * Primary file for the API.
 */

// Dependencies.
const server = require("./src/server");
const mongoDB = require("./src/db");
const os = require("os");

console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem())

// Declare the app.
const app = {};

// Init function.
app.init = () => {
    // Connect to MongoDB then Start the server
    mongoDB.init()
        .then(() => server.init())
        .catch((e) => console.log(e));
};

// Execute.
app.init();

// Export the module.
module.exports = app;
