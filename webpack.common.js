const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    externals: {
        // global app config object
        config: JSON.stringify({
            appUrl: process.env.APP_URL,
            clientId: process.env.CLIENT_ID,
            vapidKey: process.env.VAPID_KEY,
        }),
    },
    module: {
        rules: [
            {
                /*
                 * pass all javascript files through babel
                 * this compiles the JSX and converts ES6 code into regular JS
                 */
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                },
            },
        ],
    },
    /*
     * specify how the final JS is injected into the html document
     */
    plugins: [
        new HtmlWebPackPlugin({
            chunks: ["landing"],
            favicon: "./src/assets/favicon.ico",
            template: "./src/index.ejs",
            filename: "./index.html",
            templateParameters: {
                appUrl: process.env.APP_URL,
            },
        }),
        new HtmlWebPackPlugin({
            chunks: ["app"],
            template: "./src/app.ejs",
            filename: "./spotify/index.html",
        }),
        new HtmlWebPackPlugin({
            chunks: ["faq"],
            template: "./src/faq.ejs",
            filename: "./faq/index.html",
            templateParameters: {
                appUrl: process.env.APP_URL,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: "./src/assets"},
            ],
        }),
    ],
    entry: {
        landing: ["babel-polyfill", "./src/index.js"],
        app: ["babel-polyfill", "./src/spotify.js"],
        faq: ["babel-polyfill", "./src/faq.js"],
        "service-worker": ["babel-polyfill", "./src/service-worker.js"],
    },
};