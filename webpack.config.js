const path = require('path');
const webpack = require('webpack');
const vaidator = require('webpack-validator');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    dist: path.join(__dirname, 'dist'),
    build: path.join(__dirname, 'build'),
    cache: path.join(__dirname, 'cache'),
    node_modules: path.join(__dirname, 'node_modules')
};

const common_build = {
    devtool: 'source-map',
    context: __dirname,
    entry: [
        PATHS.src
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: PATHS.src
            }],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                include: PATHS.dist
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'Testing',
            appMountId: 'app',
            inject: false
        }),
        new webpack.ProvidePlugin({
            d3: 'd3'
        })
    ],
};

const dev_build = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        inline: true,
        contentBase: PATHS.dist,
        stats: 'errors-only',
        host: ENV.host,
        port: ENV.port
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?cacheDirectory=' + PATHS.cache],
            exclude: PATHS.node_modules
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
            include: PATHS.css
        }]
    }
};

const prod_build = {
    output: {filename: '[name].[chunkhash].js', chunkFilename: '[chunkhash].js'},
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: PATHS.node_modules,
        }, {
            test:/\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css'),
            include: PATHS.css
        }]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify("production")}}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false, drop_console: true},
            beautify: false,
            comments: false,
            mangle: {except: ['$', 'webpackJsonp'], screw_ie8: true, keep_fnames: false}
        }),
        new ExtractTextPlugin('[name].[chunkhash].css')
    ]
};

const clean_build = {
    plugins: [
        new CleanWebpackPlugin([PATHS.dist], {root: process.cwd()})
    ]
};

var config;
switch (TARGET) {
    case 'start:dev':
        config = vaidator(merge(common_build, dev_build));
        break;
    case 'build:dev':
        config = vaidator(merge(common_build, dev_build, clean_build));
        break;
    case 'start:prod':
        config = vaidator(merge(common_build, prod_build));
        break;
    case 'build:prod':
        config = vaidator(merge(common_build, prod_build, clean_build));
        break;
    default:
        config = common_build;
}
module.exports = config;

