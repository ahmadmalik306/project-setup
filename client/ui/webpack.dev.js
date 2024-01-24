const { merge } = require("webpack-merge");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].[contentHash].js",
    chunkFilename: "[id].[contentHash].js",
    publicPath: "",
  },
  devtool: "source-map",
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
      chunkFilename: "[id].[contentHash].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
