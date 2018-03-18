module.exports = function (args, defvalue) {
    if (args.length) {
        return args[0] === 'skip'
            ? ''
            : args[0];
    }

    return defvalue;
}