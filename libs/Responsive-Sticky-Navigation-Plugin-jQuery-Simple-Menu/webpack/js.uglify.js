const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = function() {
    return {
        plugins: [
            new UglifyJSPlugin()
        ]
    };
};