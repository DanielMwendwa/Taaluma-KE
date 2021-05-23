/**
 * User request handlers.
 */

// Dependencies.
const putUser = require("../actions/user/putUser");
const getUser = require("../actions/user/getUser");
const postUser = require("../actions/user/postUser");
const deleteUser = require("../actions/user/deleteUser");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Users controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
userController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getUser(requestData);

        case "post":
            return await postUser(requestData);

        case "put":
            return await putUser(requestData);

        case "delete":
            return await deleteUser(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = userController;
