const cosmiconfig = require('cosmiconfig');

module.exports = function (dir) {
    const { config = {} } =
        cosmiconfig('shivas', {
            rcExtensions: true,
            sync: true
        }).load(dir) || {}

    const defaults = {
        branchname: "^(develop|dev|realese)|^(feature|bugfix|hotfix)\/[A-Za-z]+-\\d+",
        commitmsg: "^[A-Za-z]+-\\d+"
    }
 
    return { ...defaults, ...config }
}