import AppGenerator from './AppGenerator/AppGenerator';
import { yargs, chalk, semver, cheerio } from '@umijs/utils';
import inquirer from 'inquirer';
import path, { sep } from 'path';
import validateProjectName from 'validate-npm-package-name';
import fs from 'fs-extra';
import got from 'got';
import { exec } from 'child_process';


const printErrorAndExit = (message: string) => {
  console.error(chalk.red(message));
  process.exit(1);
};

const checkAppName = (appName: string) => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(`Cannot create a project named ${chalk.green(`"${appName}"`)} because of npm naming restrictions:\n`),
    );
    [...(validationResult.errors || []), ...(validationResult.warnings || [])].forEach(error => {
      console.error(chalk.red(`  * ${error}`));
    });
    printErrorAndExit('\nPlease choose a different project name.');
  }
};

let getPkgRegistry = async (url: string) => {
  return await got.get(url).json();
};

const output = (...msg: any) => {
  console.log(...msg);
};

const createApp = async (name: string, cwd: any, version: string, args: any) => {
  const unsupportedNodeVersion = !semver.satisfies(
    // Coerce strings with metadata (i.e. `v14.18.1`).
    semver.coerce(process.version) ?? '',
    '>=14',
  );

  if (unsupportedNodeVersion) {
    output(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 14 or higher for a better, fully supported experience.\n`,
      ),
    );
  }

  let originalDirectory = cwd;
  if (name) {
    originalDirectory = path.resolve(name);
    const appName = path.basename(originalDirectory);

    checkAppName(appName);
    fs.ensureDirSync(name); // ensureDir()函数的同步版本。该函数确保该目录存在，如果目录结构不存在，它将由该函数创建。也可以使用mkdirsSync()和mkdirpSync()代替ensureDirSync()，结果将相同。
  }

  let tpl = 'web';
  const templateList = ['web', 'component', 'mobile'];


  if (!args.tpl) {
    const q = await inquirer.prompt({
      type: 'list',
      message: '请选择模板:(web: pc web | component: 组件 | mobile: h5 mobile',
      name: 'tpl',
      choices: templateList,
    });
    tpl = q.tpl;
  } else {
    tpl = args.tpl;
  }

  const cliPkg = 'cli';

  output(` 正在获取${chalk.yellow(cliPkg)}版本中...,请稍候`);

  let latestVersion = version

  // exec('yarn info @pengyin/create-cli', (err, sdkinfo) => {
  //   console.log(JSON.parse(sdkinfo)['dist-tags'], JSON.parse(sdkinfo), 1);
  //   latestVersion = JSON.parse(sdkinfo)['dist-tags']['latest']
  // })

  output(` 获取 ${cliPkg} latest version is ${chalk.green(latestVersion)}`);

  const paths = originalDirectory.split(sep) || [];
  const popPath = paths[paths.length - 1];

  output(` Creating a new cli React app in ${chalk.green(originalDirectory)}.`);

  if (templateList.includes(tpl)) {
    const generator = new AppGenerator({
      cwd: originalDirectory,
      args: {
        ...args,
        props: {
          version: `^${version}`,
          name: popPath,
          tpl: tpl,
        },
      },
    });
    await generator.run();
  } else {
    printErrorAndExit('\nPlease choose the correct one from list[web| pc | mobile].');
  }
};


export default async ({ cwd, args }: { cwd: string; args: yargs.Arguments }) => {
  const [projectName] = process.argv.splice(2)
  const { version } = require('../package.json')
  console.log(projectName, version);
  await createApp(projectName || '', cwd, version, args);
  return;

  // const generator = new AppGenerator({
  //   cwd,
  //   args,
  // });
  // await generator.run();
};
