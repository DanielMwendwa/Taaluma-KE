// Dependencies.
const {MongoClient} = require("mongodb");
const {uri, dbName} = require("./config").mongoDB;

// Container for the module (to be exported).
const connection = {};

let _db;

// Init script.
connection.init = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        _db = client.db(dbName);
        console.log("\x1b[35m%s\x1b[0m", "Connected successfully to DB");
    } catch (e) {
        console.error(e);
    }
};

connection.getDb = () => {
    return _db;
}

// Export the module.
module.exports = connection;
