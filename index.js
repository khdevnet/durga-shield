const os = require('os')
const executeCommand = require('child_process').execSync;
const readFile = require('fs').readFileSync;

const logger = require('./services/logger');
const commitMessageValidator = require('./validators/commit-message-validator');
const branchnameValidator = require('./validators/branchname-validator');

validateGitArtifacts(process.argv.slice(2));

function validateGitArtifacts(args) {
    const options = parseOptions(args);

    const targets = {
        branch: branchnameValidator,
        commitmsg: commitMessageValidator
    };

    validate(targets, options);

    function parseOptions(args) {
        if (args.length < 2) {
            logErrorAndExit(`You pass less arguments then expected.${getHelpMessage()}`);
        }

        if (args.length > 2) {
            logErrorAndExit(`You pass more arguments then expected. ${getHelpMessage()}`);
        }

        return {
            target: args[0],
            pattern: args[1]
        };

        function getHelpMessage() {
            const currentFilename = __filename.split(/[\\/]/).pop();
            return `${os.EOL} Please use command: ${os.EOL}`
                + `$ node ${currentFilename} [validation target (branch,commitmsg)] [Regex pattern] ${os.EOL}`
                + `$ node ${currentFilename} commitmsg \'issue-\'`;
        }
    }

    function validate(targets, options) {
        const targetsKeys = Object.keys(targets);
        if (!targetsKeys.includes(options.target)) {
            logErrorAndExit(`Target argument: '${options.target}' is not support. Please use following: ${targetsKeys}.`);
        }

        targets[options.target](options.pattern);
    }

    function logErrorAndExit(message) {
        logger.error(message);
        process.exit(1);
    }
}
