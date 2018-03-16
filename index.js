exports.printMsg = function() {
  console.log("This is a message from the demo package");
}

const childProcess = require('child_process');
const fs = require('fs');
console.log("=========commit-msg==========");
console.log(process.env.GIT_PARAMS);
const commitMessage = fs.readFileSync(process.env.GIT_PARAMS, "utf8");
if (commitMessage.match('(feature|bugfix|merge)\/(CSDP-)')) {
    console.log("success");
} else {
    console.log("failed");
    throw new Error();
}
console.log(commitMessage);

console.log("===========commit-msg============");

function getCurrentBranch() {
    return childProcess.execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).toString();
}