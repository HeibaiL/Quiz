const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })]
};
