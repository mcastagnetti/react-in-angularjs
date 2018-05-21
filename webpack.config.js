module.exports = {
    entry: './src/react-in-angularjs.js',
    output: {
        filename: 'react-in-angularjs.min.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
};