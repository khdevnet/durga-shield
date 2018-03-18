const minimist = require('minimist');
const readFile = require('fs').readFileSync;

const commitMessageValidator = require('../src/validators/commit-message-validator');

const argv = minimist(process.argv.slice(2))
const gitCommitMessageFilePath = argv.g;
const validationPattern = argv.p;
const commitMessage = readFile(gitCommitMessageFilePath, 'utf8')

commitMessageValidator(commitMessage, validationPattern);