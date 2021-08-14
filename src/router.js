/**
 * Module that configures available routes in a system.
 */

// Dependencies.
const pingController = require("./controllers/pingController");
const notFoundController = require("./controllers/notFoundController");
const tokenController = require("./controllers/tokenController");
const userController = require("./controllers/userController");
const usersController = require("./controllers/usersController");
const schoolUserController = require("./controllers/schoolUserController");
const accountRecoveryController = require("./controllers/accountRecoveryController");
const clustersController = require("./controllers/clustersController");
const clusterController = require("./controllers/clusterController");
const industriesController = require("./controllers/industriesController");
const industryController = require("./controllers/industryController");
const templateController = require("./controllers/templateController");
const publicController = require("./controllers/publicController");
const careerController = require("./controllers/careerController");
const careersController = require("./controllers/careersController");
const performanceController = require("./controllers/performanceController");
const altTitleController = require("./controllers/altTitleController");
const eduController = require("./controllers/eduController");
const actController = require("./controllers/actController");
const coursesController = require("./controllers/coursesController");

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

    "api/users/all": {
        controller: usersController,
    },

    "api/schools": {
        controller: schoolUserController,
    },

    "api/recovery": {
        controller: accountRecoveryController,
    },

    "api/contact-us": {
        // controller: contactUsController,
    },

    "api/tokens": {
        controller: tokenController,
    },

    "api/clusters": {
        controller: clustersController,
    },

    "api/cluster": {
        controller: clusterController,
    },

    "api/courses": {
        controller: coursesController,
    },

    "api/industries": {
        controller: industriesController,
    },

    "api/industry": {
        controller: industryController,
    },

    "api/career": {
        controller: careerController,
    },

    "api/career/all": {
        controller: careersController,
    },

    "api/performance": {
        controller: performanceController,
    },

    "api/alt-title": {
        controller: altTitleController,
    },

    "api/edu": {
        controller: eduController,
    },

    "api/act": {
        controller: actController,
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
        data: { "head.title": "Dashboard" },
    },

    "admin/dashboard": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/dashboard/careers": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/dashboard/clusters": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/dashboard/industries": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/dashboard/schools": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/dashboard/courses": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/career/action": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/user/action": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/user/add": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/career/add": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },
    "admin/career/add/alt": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },
    "admin/career/add/act": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },
    "admin/career/add/edu": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/cluster/action": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    "admin/industry/action": {
        controller: templateController,
        data: { "head.title": "Dashboard" },
    },

    industries: {
        controller: templateController,
        data: { "head.title": "Industry List" },
    },

    industry: {
        controller: templateController,
        data: { "head.title": "Industry" },
    },

    faq: {
        controller: templateController,
        data: { "head.title": "FAQ" },
    },

    clusters: {
        controller: templateController,
        data: { "head.title": "Clusters" },
    },

    cluster: {
        controller: templateController,
        data: { "head.title": "Cluster" },
    },

    career: {
        controller: templateController,
        data: { "head.title": "Career" },
    },

    recommended: {
        controller: templateController,
        data: { "head.title": "Recommended careers" },
    },

    "search/career": {
        controller: templateController,
        data: { "head.title": "Search Career" },
    },

    "school/dashboard": {
        controller: templateController,
        data: { "head.title": "School Dashboard" },
    },

    "account/recovery": {
        controller: templateController,
        data: { "head.title": "Account Recovery" },
    },

    "admin/sys/report": {
        controller: templateController,
        data: { "head.title": "System Report" },
    },

    "course/careers": {
        controller: templateController,
        data: { "head.title": "Careers based on course" },
    },
};

// Define notFound (404) controller.
router.notFound = notFoundController;

// Export the module.
module.exports = router;
