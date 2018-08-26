const path = require('path');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const uglifyJS = require('./webpack/js.uglify');
const babel = require('./webpack/babel');


const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};
const common = {
    entry: {
        'jquery': PATHS.source + '/js/jquery.simple-menu.js',
        'noframework': PATHS.source + '/js/noframework.simple-menu.js',
    },
    output: {
        path: PATHS.build,
        filename: '[name].simple-menu.js'
    },
    plugins: [

    ],
};

module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            babel(),
            uglifyJS()
        ]);
    }
    if (env === 'development') {

        return merge([
            common,
            devserver(),
            babel(),
        ]);
    }
};