#!/usr/bin/env node
const os = require('os');
const executeCommand = require('child_process').execSync;

const parsePattern = require('./parse-pattern');

validateBranchname(process.argv.slice(2));

function validateBranchname(args) {
  const pattern = parsePattern(
    args,
    '^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+'
  );
  const branchName = getCurrentBranchName();

  if (!branchName.match(pattern)) {
    throw new Error(`${os.EOL} Branch name is not allowed by pattern ${pattern}.${os.EOL} Branch name: ${branchName}`);
  }

  function getCurrentBranchName() {
    const branchName = executeCommand('git rev-parse --abbrev-ref HEAD');

    if (!branchName) {
      throw new Error('Unable to determine branch name using git command.');
    }

    return branchName.toString();
  }
};
