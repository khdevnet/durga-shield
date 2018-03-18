const commitMessageValidator = require('../src/commit-message-validator');
const gitCommitMessageFilePath = process.env.GIT_PARAMS;

console.log('test test test======');
commitMessageValidator(gitCommitMessageFilePath);