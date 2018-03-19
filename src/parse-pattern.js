module.exports = function (args, defvalue) {
        return args.length
            ? args[0]
            : defvalue;
}
