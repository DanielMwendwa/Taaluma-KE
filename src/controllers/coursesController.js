/**
 * User request handlers.
 */

// Dependencies.

const getCourses = require("../actions/course/getCourses");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Users controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
coursesController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getCourses(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = coursesController;
