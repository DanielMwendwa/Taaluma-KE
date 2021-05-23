/**
 * Create and export configuration variables.
 */

// General container for all the environments.
const environments = {};

// Staging (default) environment.
environments.staging = {
    httpPort: httpPort,
    environmentName: "",
    hashingSecret: "",
    tokenLifetime: tokenLifetime,
    mongoDB: {
        uri: "",
        dbName: ""
    },
    mailgun: {
        domainName: "sandboxXXXXXXXXXXXXXXXXXX.mailgun.org",
        host: "api.mailgun.net",
        authUsername: "api",
        privateKey: "XXXXXXXXXXXXXXXXXXXXXXXXX",
        from: "postmaster@sandboxXXXXXXXXXXXXXXXXXX.mailgun.org",
    },
    templateGlobals: {
        appName: "",
    },
};

// Production environment.
environments.production = {
    httpPort: httpPort,
    environmentName: "",
    hashingSecret: "",
    tokenLifetime: tokenLifetime,
    mailgun: {
        domainName: "sandboxXXXXXXXXXXXXXXXXXX.mailgun.org",
        host: "api.mailgun.net",
        authUsername: "api",
        privateKey: "XXXXXXXXXXXXXXXXXXXXXXXXX",
        from: "postmaster@sandboxXXXXXXXXXXXXXXXXXX.mailgun.org",
    },
};

// Determine which environment was passed as command-line argument.
const currentEnvironment = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV.toLocaleLowerCase() : "";

// Check that current environment is one of the environments above, if not, default to staging.
const environmentToExport =
    typeof environments[currentEnvironment] === "object" ? environments[currentEnvironment] : environments.staging;

// Export the module.
module.exports = environmentToExport;

