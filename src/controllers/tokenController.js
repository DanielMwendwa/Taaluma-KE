/**
 * Token request handlers.
 */

// Dependencies.
const putToken = require("../actions/token/putToken");
const getToken = require("../actions/token/getToken");
const postToken = require("../actions/token/postToken");
const deleteToken = require("../actions/token/deleteToken");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Tokens controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
tokenController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getToken(requestData);

        case "post":
            return await postToken(requestData);

        case "put":
            return await putToken(requestData);

        case "delete":
            return await deleteToken(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = tokenController;
