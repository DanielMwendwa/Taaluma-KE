/**
 * Controller that dynamically serves request HTML templates based on request path.
 */

// Dependencies.
const ResponseContainer = require("../models/ResponseContainer");
const publicLoader = require("../lib/publicLoader");

/**
 * Public Controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const publicController = async (requestData) => {
    // Reject any request that isn't a GET.
    if (requestData.method !== "get") {
        return new ResponseContainer(405);
    }

    // Generate template name.
    const trimmedPublicName = requestData.trimmedPath.replace("public/", "").trim();

    // Compile template string.
    const publicData = await publicLoader(trimmedPublicName);
    if (!publicData) {
        // Can not find a template.
        return new ResponseContainer(404);
    }

    // Get public extension.
    const publicExtension = trimmedPublicName.split(".").pop().toLowerCase();

    // Return the public data to the requester.
    return new ResponseContainer(200, publicData, publicExtension);
};

// Export the module.
module.exports = publicController;
