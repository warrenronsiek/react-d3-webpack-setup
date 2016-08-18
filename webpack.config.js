const path = require('path');
const webpack = require('webpack');
const vaidator = require('webpack-validator');
const WebpackDevServer = require('webpack-dev-server');
const HtmlwebpackPlugin = require('html-webpack-plugin');
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
        PATHS.src
    ],
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    output: {
        path: PATHS.build,
        filename: '[name].bundle.js',
        publicPath: PATHS.build + '/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css-loader'],
                include: PATHS.css
            }]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'Testing',
            appMountId: 'app',
            inject: false
        })
    ]
};

const dev_build = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        inline: true,
        contentBase: PATHS.build,
        host: ENV.host,
        port: ENV.port
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?cacheDirectory=' + PATHS.cache],
            exclude: path.join(__dirname, 'node_modules')
        }]
    }
};

module.exports = vaidator(merge(common_build, dev_build));
