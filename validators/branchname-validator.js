const executeCommand = require('child_process').execSync;

const logger = require('../services/logger');

module.exports = function (pattern) {
    const branchName = getCurrentBranchName();

    if (!branchName.match(pattern)) {
        logger.error(`Branch name '${branchName}' is not allowed by pattern '${pattern}'.`);
        process.exit(1);
    }

    function getCurrentBranchName() {
        const branchName = executeCommand('git rev-parse --abbrev-ref HEAD');

        if (!branchName) {
            logger.error('Unable to determine branch name using git command.');
            process.exit(1);
        }

        return branchName.toString();
    }
}
