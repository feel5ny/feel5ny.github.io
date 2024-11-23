module.exports = function(  ) {
    return {
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                },
                {
                    loader: "babel-loader",
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    query: {
                        plugins: ['transform-runtime'],
                        presets: ['es2015','vue'],
                    }
                },
            ]
        }
    };
};