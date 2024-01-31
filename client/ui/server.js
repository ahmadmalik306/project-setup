const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
require("dotenv").config();
const path = require("path");

const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "0.0.0.0";

const webpackConfig = process.env.MODE === "development" ? devConfig : prodConfig;

const compiler = Webpack(webpackConfig);

const server = new WebpackDevServer(
  {
    static: path.join(__dirname, "./dist"),
    historyApiFallback: true,
    port,
    host,
  },
  compiler
);
const runServer = async () => {
  console.log(`Starting server on ${host}:${port}`);
  await server.start();
};
runServer();
