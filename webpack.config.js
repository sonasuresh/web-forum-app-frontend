var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: { path: __dirname + './build', filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node-modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "/client/public/index.html"),
        compress: true,
        port: 3000,
    }
};