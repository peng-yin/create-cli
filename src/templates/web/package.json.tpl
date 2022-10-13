{
  "name": "webpack",
  "version": "1.0.0",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack serve --config=./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production node --max_old_space_size=8096 ./node_modules/webpack/./bin/webpack --config=./config/webpack.prod.js",
    "analyse": "cross-env NODE_ENV=production ANALYSE=yes webpack --config=./config/webpack.prod.js"
  },
  "license": "ISC",
  "dependencies": {
    "antd": "^4.20.3",
    "autoprefixer": "^10.4.7",
    "axios": "^0.27.2",
    "classnames": "^2.3.1",
    "core-js": "^3.22.5",
    "cssnano": "^5.1.7",
    "lodash": "^4.17.21",
    "moment": "^2.29.3",
    "postcss-flexbugs-fixes": "^5.0.2",
    "qs": "^6.10.3",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-redux": "^8.0.1",
    "react-router-dom": "^6.3.0",
    "redux": "^4.2.0",
    "redux-thunk": "^2.4.1",
    "regenerator-runtime": "^0.13.9",
    "typescript": "^4.6.4"
  },
  "devDependencies": {
    "@babel/core": "^7.17.10",
    "@babel/preset-env": "^7.17.10",
    "@babel/preset-react": "^7.16.7",
    "@babel/preset-typescript": "^7.16.7",
    "@types/lodash": "^4.14.182",
    "@types/qs": "^6.9.7",
    "@types/react-dom": "^18.0.3",
    "@types/react-redux": "^7.1.24",
    "@types/webpack-env": "^1.16.4",
    "@typescript-eslint/eslint-plugin": "^5.23.0",
    "@typescript-eslint/parser": "^5.23.0",
    "babel-loader": "^8.2.5",
    "babel-plugin-import": "^1.13.5",
    "babel-plugin-lodash": "^3.3.4",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.1",
    "dotenv-webpack": "^7.1.0",
    "eslint": "^8.15.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-react": "^7.29.4",
    "eslint-plugin-react-hooks": "^4.5.0",
    "fork-ts-checker-webpack-plugin": "^7.2.11",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "lint-staged": "^12.4.1",
    "mini-css-extract-plugin": "^2.6.0",
    "node-sass": "^7.0.1",
    "postcss-loader": "^6.2.1",
    "prettier": "^2.6.2",
    "sass": "^1.51.0",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "terser-webpack-plugin": "^5.3.1",
    "thread-loader": "^3.0.4",
    "url-loader": "^4.1.1",
    "webpack": "^5.72.1",
    "webpack-bundle-analyzer": "^4.5.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0",
    "webpack-merge": "^5.8.0"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,scss,md,json}": [
      "prettier --write",
      "git add"
    ],
    "src/**/*.ts?(x)": [
      "prettier --parser=typescript --write",
      "git add"
    ]
  }
}
