"use strict";

function _utils() {
  const data = require("@umijs/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _fs() {
  const data = require("fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

const args = (0, _utils().yParser)(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h']
  },
  boolean: ['version']
});

if (args.version && !args._[0]) {
  args._[0] = 'version';
  const local = (0, _fs().existsSync)((0, _path().join)(__dirname, '../.local')) ? _utils().chalk.cyan('@local') : '';

  const _require = require('../package.json'),
        name = _require.name,
        version = _require.version;

  console.log(`${name}@${version}${local}`);
} else {
  require('./').default({
    cwd: process.cwd(),
    args
  }).catch(err => {
    console.error(`Create failed, ${err.message}`);
    console.error(err);
  });
}