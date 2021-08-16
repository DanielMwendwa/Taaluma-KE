/**
 * Favourites request handlers.
 */

// Dependencies.
const postFav = require("../actions/fav/postFav");
const deleteFav = require("../actions/fav/deleteFav");
const ResponseContainer = require("../models/ResponseContainer");

/**
 * Favourites controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
favController = async (requestData) => {
    switch (requestData.method) {
        case "post":
            return await postFav(requestData);
        
        case "delete":
            return await deleteFav(requestData);

        default:
            return new ResponseContainer(405, { error: "Method is not allowed" });
    }
};

// Export the module.
module.exports = favController;
