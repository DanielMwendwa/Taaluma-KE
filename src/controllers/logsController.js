/**
 * Logs request handlers.
 */

// Dependencies.
const getLogs = require("../actions/sys-logs/getLogs");
const postLogs = require("../actions/sys-logs/postLogs");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Logs controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
logsController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getLogs(requestData);

        case "post":
            return await postLogs(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = logsController;
