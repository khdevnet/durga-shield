const os = require('os')
const executeCommand = require('child_process').execSync;
const readFile = require('fs').readFileSync;

validateGitArtifacts(process.argv.slice(2));

function validateGitArtifacts(args) {
    const options = parseOptions(args);

    const targets = {
        branch: validateBranch,
        commitmsg: validateCommitmsg
    };

    validate(targets, options);

    function parseOptions(args) {
        if (args.length < 2) {
            throw error(`You pass less arguments then expected.${getHelpMessage()}`);
        }

        if (args.length > 2) {
            throw error(`You pass more arguments then expected. ${getHelpMessage()}`);
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
            error(`Target argument: '${options.target}' is not support. Please use following: ${targetsKeys}.`);
        }

        targets[options.target](options.pattern);
    }

    function validateCommitmsg(pattern) {
        const commitMessage = readFile(process.env.GIT_PARAMS, "utf8");
        if (!commitMessage.match(pattern)) {
            error(`Commit message '${commitMessage}' is not allowed by pattern '${pattern}'.`);
        }
    }

    function validateBranch(pattern) {
        const branchName = getCurrentBranchName();

        if (!branchName.match(pattern)) {
            error(`Branch name '${branchName}' is not allowed by pattern '${pattern}'.`);
        }

        function getCurrentBranchName() {
            const branchName = executeCommand('git rev-parse --abbrev-ref HEAD');

            if (!branchName) {
                error('Unable to determine branch name using git command.');
            }

            return branchName.toString();
        }
    }

    function error(message) {
        console.log(message);
        process.exit(1);
    }
}
