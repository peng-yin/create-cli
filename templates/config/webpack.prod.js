const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    clean: true,
    pathinfo: true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
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
  optimization: {
    chunkIds: 'deterministic',
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 200000,
      minChunks: 1,
    },
  },
  externals: {},
  performance: {
    hints: 'error',
    maxAssetSize: 300000, // 整数类型（以字节为单位）
    maxEntrypointSize: 500000 // 整数类型（以字节为单位）
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public/index.html'),
      minify: true,
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    // 生成sourceMap
    new webpack.SourceMapDevToolPlugin({
      // 对js文件进行sourcemap, 有sourcemap时, 上传到内网, 便于调试定位问题
      test: /\.(tsx|jsx|js)$/,
      filename: '[file].map',
      publicPath: '',
    }),
    process.env.ANALYSE === 'yes' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
});
