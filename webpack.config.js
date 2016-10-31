// TODO: create multiple entry point files

var webpack = require('webpack');

var path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'public', 'script'),
        filename: 'bundle.js'
    },
    cache: true,
    module: {
        loaders: [
            { test: /\.js$/, exclude: path.resolve(__dirname, 'node_modules'), loader: 'babel-loader?cacheDirectory' },
            { test: /\.scss$/, loader: 'style!css!sass?outputStyle=compressed' },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    sassLoader: {
        includePaths: [
            './node_modules'
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
    ]
};