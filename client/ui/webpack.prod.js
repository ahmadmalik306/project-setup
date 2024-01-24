const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
/* const TerserPlugin = require("terser-webpack-plugin"); */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[contentHash].js",
    chunkFilename: "[id].[contentHash].js",
    publicPath: "",
  },
  optimization: {
    minimizer: [/* new TerserPlugin(), */ new CssMinimizerPlugin()],

    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
      chunkFilename: "[id].[contentHash].css",
    }),
  ],
});
