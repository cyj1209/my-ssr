const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const nodeExternals = require("webpack-node-externals");
console.log("here is webpack server");
module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.csr.html",
      template: "src/index.csr.html",
      inject: true
    })
  ],
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
