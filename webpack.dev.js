const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        // start development server on the specified port
        port: 9000,
        open: false,
        https: true,
    },
    // enable source maps to aid in debugging
    devtool: "inline-source-map",
});