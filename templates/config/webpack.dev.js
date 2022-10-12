const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: 'memory',
  },
  output: {
    pathinfo: false,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          'postcss-loader',
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public/index.html'),
      minify: false,
      inject: true,
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  devServer: {
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      logging: 'none',
    },
    proxy: {
      '/api': {
        target: 'http://yapi.xxx.com',
        changeOrigin: true,
      },
    }
  }
});
