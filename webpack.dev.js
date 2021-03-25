const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      }, 
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options:{
          name: "[name].[hash].[ext]",
          publicPath : "images",
          outputPath: "images"
        }
      }, 
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options:{
          esModule: false
        }
      }       
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
};