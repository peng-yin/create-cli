const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threadLoader = require('thread-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const packageName = ('../package.json').name;

const jsWorkerPool = {
  workers: 2,
  poolTimeout: 2000,
};

const cssWorkerPool = {
  workerParallelJobs: 2,
  poolTimeout: 2000,
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader', 'sass-loader', 'less-loader']);

module.exports = {
  entry: {
    app: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      path.resolve(__dirname, '../src/index.tsx'),
    ].filter(Boolean),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    library: `${packageName}`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    globalObject: 'window',
    crossOriginLoading: 'anonymous',
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
    },
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts', '.json'],
    symlinks: false,
    alias: {
      '@': path.join(__dirname, '../src'),
    },
    fallback: {
      crypto: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: jsWorkerPool,
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['lodash'],
            },
          }
        ],
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png|webp|svg)$/,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource"
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, `../.env/${process.env.NODE_ENV || 'production'}.cfg`), // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      expand: true, // Allows your variables to be "expanded" for reusability within your .env file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      defaults: path.join(__dirname, '.env/default.cfg'), // load '.env.defaults' as the default values if empty.
    }),
  ]
};