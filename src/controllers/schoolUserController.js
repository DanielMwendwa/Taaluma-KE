/**
 * School user request handlers.
 */

// Dependencies.
const putUser = require("../actions/school/putUser");
const getUsers = require("../actions/school/getUsers");
const postUser = require("../actions/school/postUser");
const deleteUser = require("../actions/school/deleteUser");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Users controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
schoolUserController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getUsers(requestData);

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
module.exports = schoolUserController;
