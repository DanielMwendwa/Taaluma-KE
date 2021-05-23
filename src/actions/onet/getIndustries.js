const onetWebService = require("../../lib/onetWebService");
const validator = require("../../lib/validator");
const verifyToken = require("../../actions/token/verifyToken");
const ResponseContainer = require("../../models/ResponseContainer");

/**
 * Get industries.
 * @param { RequestData } requestData
 * @return { Promise }
 */
const getIndustries = async (requestData) => {
    // Get the token from the headers.
    const tokenId = validator.parseString(requestData.headers.token);

    // Verify user token.
    /** @var {Token} token */
    const verifiedToken = await verifyToken(tokenId);
    if (!verifiedToken) {
        return new ResponseContainer(403, { error: "Token is invalid" });
    }

    // Lookup the industries.
    // const defaultMenuId = "main";
    // const rawMenuItems = await database.read("menus", defaultMenuId);
    try {
        const { industry } = await onetWebService.call("mnm/browse/");
        return new ResponseContainer(200, industry);
    } catch (error) {
        console.log(error);
    }

    // Create menu items instances.
    // const menuItems = rawMenuItems.map((rawMenuItem) => new MenuItem(rawMenuItem).toObject());
    // return new ResponseContainer(200, menuItems);
};

// Export module.
module.exports = getIndustries;
