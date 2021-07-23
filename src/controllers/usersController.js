/**
 * User request handlers.
 */

// Dependencies.
const getUsers = require("../actions/user/getUsers");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Users controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
usersController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getUsers(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = usersController;
