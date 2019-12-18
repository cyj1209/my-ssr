const path = require("path");
// const nodeExternals = require("webpack-node-externals");
console.log("here is webpack server");
module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
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
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
