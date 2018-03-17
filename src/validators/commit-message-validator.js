const logger = require('../services/logger');

module.exports = function (commitMessage, pattern) {
    if (!commitMessage.match(pattern)) {
        logger.error(`Commit message is not allowed by pattern '${pattern}'.`);
        logger.error(`Message: ${commitMessage}`);
        process.exit(1);
    }
};
