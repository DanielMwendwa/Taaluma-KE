/**
 * Education request handlers.
 */

// Dependencies.
const postEdu = require("../actions/education/postEdu");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Education controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
eduController = async (requestData) => {
    switch (requestData.method) {
        case "post":
            return await postEdu(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = eduController;