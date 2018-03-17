const readFile = require('fs').readFileSync;

const logger = require('../services/logger');

module.exports = function (pattern) {
    const commitMessage = readFile(process.env.GIT_PARAMS, "utf8");
    if (!commitMessage.match(pattern)) {
        logger.error(`Commit message '${commitMessage}' is not allowed by pattern '${pattern}'.`);
        process.exit(1);
    }
}
