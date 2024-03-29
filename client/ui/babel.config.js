module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env", "@babel/react", "@babel/preset-typescript"],
    plugins: ["@babel/plugin-transform-runtime"],
    compact: false,
    sourceType: "unambiguous",
  };
};
