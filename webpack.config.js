const path = require('path');
const webpack = require('webpack');
const vaidator = require('webpack-validator');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const ENV = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080
};

const PATHS = {
    dir: __dirname,
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src', 'js'),
    css: path.join(__dirname, 'src', 'css'),
    build: path.join(__dirname, 'dist'),
    cache: path.join(__dirname, 'cache')
};

const common_build = {
    devtool: 'source-map',
    context: __dirname,
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
        publicPath: PATHS.build + '/'
    }
};

const dev_build = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        inline: true,
        host: ENV.host,
        port: ENV.port
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: path.join(__dirname, 'node_modules')
        }]
    }
};

module.exports = vaidator(merge(common_build, dev_build));
