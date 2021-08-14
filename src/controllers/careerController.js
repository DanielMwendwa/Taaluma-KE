/**
 * Career request handlers.
 */

// Dependencies.
const getCareer = require("../actions/career/getCareer");
const postCareer = require("../actions/career/postCareer");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Career controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
careerController = async (requestData) => {
    switch (requestData.method) {
        case "get":
            return await getCareer(requestData);

        case "post":
            return await postCareer(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = careerController;
