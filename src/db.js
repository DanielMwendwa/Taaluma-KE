/**
 * Library for storing and editing data.
 */

// Dependencies.
const {MongoClient} = require("mongodb");

// Container for the module (to be exported).
const connection = {};

let _db;

// Init script.
connection.init = async () => {
    const uri = "mongodb+srv://mwesh:12345Admin@cluster0.byfxq.mongodb.net/Taaluma?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        _db = client.db("Taaluma");
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
