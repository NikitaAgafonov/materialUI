const webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    entry: './app/main.js',

    output: {
        filename: 'build.js',
        path: './app/'
    },

    watch: NODE_ENV==='development',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                options: {
                    optional: 'runtime',
                    presets: ["es2015","react"],
                    plugins: [
                        ["transform-react-jsx", {
                            "pragma": "React.createElement"
                        }]
                    ]
                },
            }
        ]
    },

    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['app'] }
        })
    ],

    devtool: "source-map"
};