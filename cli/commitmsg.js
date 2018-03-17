const argv = require('minimist')(process.argv.slice(2));
const readFile = require('fs').readFileSync;

const commitMessageValidator = require('../src/validators/commit-message-validator');
console.log(argv);
const commitMessage = readFile(argv.g, 'utf8')
commitMessageValidator(commitMessage, argv.p);