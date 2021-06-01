/**
 * Module that configures available routes in a system.
 */

// Dependencies.
const pingController = require("./controllers/pingController");
const notFoundController = require("./controllers/notFoundController");
const tokenController = require("./controllers/tokenController");
const userController = require("./controllers/userController");
const industriesController = require("./controllers/industriesController");
const templateController = require("./controllers/templateController");
const publicController = require("./controllers/publicController");

// Create module container.
const router = {};

// Map path to the specific request handler (controller).
router.routes = {
    // API specific routes.
    "api/ping": {
        controller: pingController,
    },

    "api/users": {
        controller: userController,
    },

    "api/tokens": {
        controller: tokenController,
    },

    "api/industries": {
        controller: industriesController,
    },

    "api/industry": {
        controller: industryController,
    },

    // Front-End specific routes.
    "": {
        controller: templateController,
        data: { "head.title": "Taaluma Kenya" },
    },

    "public/*": {
        controller: publicController,
    },

    "user/account/create": {
        controller: templateController,
        data: { "head.title": "Create Account" },
    },

    "user/account/edit": {
        controller: templateController,
        data: { "head.title": "Edit Account" },
    },

    "user/session/create": {
        controller: templateController,
        data: { "head.title": "Login" },
    },

    "user/dashboard": {
        controller: templateController,
        data: { "head.title": "User Dasboard" },
    },

    "industries/list": {
        controller: templateController,
        data: { "head.title": "Industry List" },
    },

    "industry": {
        controller: templateController,
        data: { "head.title": "Industry" },
    }
};

// Define notFound (404) controller.
router.notFound = notFoundController;

// Export the module.
module.exports = router;
