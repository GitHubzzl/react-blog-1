var webpack = require('webpack'),
    commonPath = require('./commonPath'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: commonPath.indexHTML,
        chunksSortMode: 'none'
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 8088,
        proxy: 'http://localhost:8088/',
        logConnections: false,
        notify: false
    }, {
        reload: true
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
);

module.exports = config;