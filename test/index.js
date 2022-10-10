#! /usr/bin/env node

import inquirer from 'inquirer'
import path from 'path'
import fs from 'fs'
import ejs from 'ejs'
import commander from './commander.js';

const __dirname = path.resolve();

inquirer.prompt([
  {
    type: 'input', //type：input,confirm,list,rawlist,checkbox,password...
    name: 'name', // key 名
    message: 'Your name', // 提示信息
    default: 'my-node-cli' // 默认值
  }
]).then(answers => {
  const dest = path.join(__dirname, 'templates');
  fs.readdir(dest, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      ejs.renderFile(path.join(dest, file), answers).then(data => {
        fs.writeFileSync(path.join(process.cwd(), file), data)
        commander()

      })
    })
  })
})
