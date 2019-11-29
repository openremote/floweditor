var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyPlugin = require("copy-webpack-plugin");
var path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        'bundle': './src/index.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: ""
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 1234,
        contentBase: './dist',
        watchContentBase: true,
        publicPath: "/" + __dirname.split(path.sep).slice(-1)[0]  + "/",

    },
    watchOptions: {
        ignored: ['**/*.ts', 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            inject: false,
            favicon: "src/favicon.png",
            template: 'src/index.html'
        }),
        new CopyPlugin([
          { from: './src/style.css', to: './style.css' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.js$/,
                include: function(modulePath) {
                    return /(@webcomponents[\/|\\]shadycss|lit-css|styled-lit-element|lit-html|lit-element|@polymer|@lit|pwa-helpers)/.test(modulePath) || !/node_modules/.test(modulePath);
                },
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    outputPath: "images/",
                    limit: 10000
                }
            }
        ]
    }
};