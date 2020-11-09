const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isEnvProduction = process.env.NODE_ENV === "production";

if (!fs.existsSync(paths.appBuild)) {
  fs.mkdirSync(paths.appBuild);
}

function getConfig() {
  const entry = {
    antd: path.resolve(paths.appNodeModules, "antd"),
    axios: path.resolve(paths.libPath, "axios.js"),
    lodash: path.resolve(paths.libPath, "lodash.js"),
    moment: path.resolve(paths.libPath, "moment.js"),
    "react-router": path.resolve(paths.appNodeModules, "react-router")
  };

  const output = {
    path: path.resolve(paths.appBuild, "library"),
    pathinfo: !isEnvProduction,
    libraryTarget: "system",
    filename: "[name].js"
  };

  const reactBundle = !isEnvProduction ? "development" : "production.min";

  const plugins = [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `node_modules/react/umd/react.${reactBundle}.js`,
          to: `${paths.appBuild}/library/react.js`
        },
        {
          from: `node_modules/react-dom/umd/react-dom.${reactBundle}.js`,
          to: `${paths.appBuild}/library/react-dom.js`
        },
        {
          from: "node_modules/systemjs/dist",
          to: `${paths.appBuild}/library/systemjs`
        }
      ]
    }),
    isEnvProduction &&
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
  ].filter(Boolean);

  const rules = [{ parser: { system: false } }];

  return {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction ? false : "source-map",
    bail: isEnvProduction,
    entry: entry,
    output: output,
    module: {
      strictExportPresence: true,
      rules: rules
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".jsx"]
    },
    plugins: plugins
  };
}

module.exports = getConfig();
