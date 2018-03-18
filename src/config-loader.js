const cosmiconfig = require('cosmiconfig');

module.exports = function (dir) {
    const { config = {} } =
        cosmiconfig('shiva', {
            rcExtensions: true,
            sync: true
        }).load(dir) || {}

    const defaults = {
        skipCI: true
    }

    console.log('config');
    console.log(config);

    return { ...defaults, ...config }
}