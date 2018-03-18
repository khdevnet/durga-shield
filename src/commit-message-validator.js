const os = require('os')
const readFile = require('fs').readFileSync;

const getConf = require('./config-loader');

module.exports = function () {
    const pattern = getConf(process.cwd()).commitmsg;
    const gitCommitMessageFilePath = process.env.GIT_PARAMS;
    if (!gitCommitMessageFilePath) {
        throw new Error('Please specify commit message file path: -g /.git/COMMIT_EDITMSG');
    }

    const commitMessage = readFile(gitCommitMessageFilePath, 'utf8')

    if (!commitMessage.match(pattern)) {
        throw new Error(`${os.EOL} Commit message is not allowed by pattern '${pattern}'. ${os.EOL} Message: ${commitMessage}`);
    }
};
