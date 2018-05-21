const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const excludes = [/node_modules/];

module.exports = {
    entry: './src/react-in-angularjs.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: excludes,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            exclude: excludes,
        }),
    ],
    output: {
        filename: 'react-in-angularjs.min.js',
  },
};