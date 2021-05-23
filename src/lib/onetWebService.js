/**
 * Onet web integration services.
 * @see: https://services.onetcenter.org/
 */

// Dependencies.
const querystring = require("querystring");
const config = require("../config");
const https = require("https");
const util = require("util");

// Configure mailgun debugger.
const debug = util.debuglog("onetWebService");

// Create library container.
const onetWebService = {};

/**
 * Charge the payment.
 * @param {string} path
 * @param {string} query
 * @return {Promise}
 */
onetWebService.call = async (path, query) => {
    // Promisify https.get() function.
    return new Promise((resolve, reject) => {
        // Check that all required fields are provided.
        if (!path) {
            reject(new Error("Missing required fields"));
        }

        // Configure the request details.
        const requestDetails = {
            auth: `${config.onetWebService.username}:${config.onetWebService.password}`,
            headers: {
                "User-Agent": "nodejs-OnetWebService/1.00 (bot)",
                Accept: "application/json",
            },
            timeout: 10000,
            maxRedirects: 0,
        };

        if (!config.onetWebService.version) {
            requestDetails.baseURL = "https://services.onetcenter.org/ws/";
        } else {
            requestDetails.baseURL = "https://services.onetcenter.org/v" + config.onetWebService.version + "/ws/";
        }

        if (query === undefined) {
            requestDetails.pathname = path;
        } else {
            // Stringify the query.
            const stringQuery = querystring.stringify(query);

            // Debug onet query.
            debug("\x1b[33m%s\x1b[0m", stringQuery);

            requestDetails.pathname = `${path}?${stringQuery}`;
        }

        const URL = `${requestDetails.baseURL}${requestDetails.pathname}`;

        // Instantiate the request object.
        https
            .get(URL, requestDetails, (res) => {
                // Grab the status of the sent request.
                const status = res.statusCode;

                if (status === 200) {
                    let data = "";

                    // A chunk of data has been received.
                    res.on("data", (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    res.on("end", () => {
                        resolve(JSON.parse(data));
                    });
                }
            })
            .on("error", (err) => {
                // Bind to the error event so it doesn't get thrown.
                reject(err);
                console.log("Error: " + err.message);
            });
    });
};

// (async () => {
//     try {
//         const vinfo = await onetWebService.call("mnm/browse/");
//         console.log("==========");
//         console.log(vinfo);
//         console.log("==========");
//     } catch (error) {
//         console.log(error);
//     }
// })();

// Export the module.
module.exports = onetWebService;
