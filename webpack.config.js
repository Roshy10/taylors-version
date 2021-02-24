const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    externals: {
        // global app config object
        config: JSON.stringify({
            appUrl: process.env.APP_URL,
            clientId: process.env.CLIENT_ID,
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
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new HtmlWebPackPlugin({
            chunks: ["app"],
            template: "./src/index.html",
            filename: "./spotify/index.html",
        }),
    ],
    entry: {
        landing: ["babel-polyfill", "./src/index.js"],
        app: ["babel-polyfill", "./src/spotify.js"],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    devServer: {
        // start development server on the specified port
        port: 9000,
        open: false,
    },
    // enable source maps to aid in debugging
    devtool: "source-map",
};