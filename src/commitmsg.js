#!/usr/bin/env node
const os = require('os')
const readFile = require('fs').readFileSync;

const parsePattern = require('./parse-pattern');

validateCommitMessage(process.argv.slice(2));

function validateCommitMessage(args) {
    const pattern = parsePattern(
        args,
        '[^[A-Za-z]+-\\d+]'
    );

    const gitCommitMessageFilePath = process.env.GIT_PARAMS;
    if (!gitCommitMessageFilePath) {
        throw new Error('Please specify commit message file path: .git/COMMIT_EDITMSG');
    }

    const commitMessage = readFile(gitCommitMessageFilePath, 'utf8')

    if (!commitMessage.match(pattern)) {
        throw new Error(`${os.EOL} Commit message is not allowed by pattern '${pattern}'. ${os.EOL} Message: ${commitMessage}`);
    }
};
