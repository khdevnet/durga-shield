const minimist = require('minimist');

const branchnameValidator = require('../src/validators/branchname-validator');

const argv = minimist(process.argv.slice(2));
const pattern = argv.p;

branchnameValidator(pattern);