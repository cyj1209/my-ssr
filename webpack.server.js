const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "development",
  entry: "./server/index.js",
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 支持import 和 jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",

          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env"]]
          }
        }
      },
      {
        test: /\.css/,
        use: ["isomorphic-style-loader", "css-loader"]
      }
    ]
  }
};
