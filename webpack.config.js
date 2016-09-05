// TODO: create multiple entry point files

var webpack = require('webpack');

module.exports = {
    entry: {
        Feed: './app.js',
        Profile: './app.js',
        Post: './app.js'
    },
    output: {
        path: 'build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        })
    ]
};