const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:"./index.js",
    output:{
        path:path.resolve(__dirname, "build"),
        filename:"bundled.js"
    },
    module:{
        rules:[
            {
                test:/\.js/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template:"./index.html"})]
};