const path = require('path');
const webpack = require('webpack');
const vaidator = require('webpack-validator');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

const ENV = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080
};

process.env.BABEL_ENV = TARGET;

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
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, PATHS.build),
        filename: '[name].bundle.js',
        publicPath: PATHS.build
    }
};

const dev_build = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: path.join(__dirname, 'node_modules')
        }]
    }
};

module.exports = vaidator(merge(common_build, dev_build));
