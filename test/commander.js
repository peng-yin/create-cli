
import { program } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import spawn from 'cross-spawn'

/*
  Loading
  Default: 'cyan'
  Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
*/
const spinner = ora('Loading');
spinner.color = 'red';
spinner.text = 'Loading rainbows';

// 定义需要按照的依赖
const dependencies = ['fs-extra'];

program
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .action(name => {
    // // 开始加载动画
    // spinner.start();
    // // 执行安装
    // const child = spawn('yarn', ['add', '-D'].concat(dependencies), {
    //   stdio: 'inherit'
    // });
    // // 监听执行结果
    // child.on('close', function (code) {
    //   // 执行失败
    //   if (code !== 0) {
    //     console.log(chalk.red('Error occurred while installing dependencies!'));
    //     spinner.stop() // 停止
    //     spinner.fail('Loading fail'); // 成功 ✔
    //     process.exit(1);
    //   }
    //   // 执行成功
    //   else {
    //     console.log(chalk.cyan('Install finished'))
    //     // 加载状态修改
    //     spinner.stop() // 停止
    //     spinner.succeed('Loading succeed'); // 成功 ✔
    //     // spinner.fail(text?);  失败 ✖
    //     // spinner.warn(text?);  提示 ⚠
    //     // spinner.info(text?);  信息 ℹ
    //   }
    // })



    // // 文本样式
    // console.log("project name is " + chalk.bold(name))

    // // 颜色
    // console.log("project name is " + chalk.cyan(name))
    // console.log("project name is " + chalk.green(name))

    // // 背景色
    // console.log("project name is " + chalk.bgRed(name))

    // // 使用RGB颜色输出
    // console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
    // console.log("project name is " + chalk.hex('#049CDB').bold(name));
    // console.log("project name is " + chalk.bgHex('#049CDB').bold(name))

  })

export default () => {
  program.parse()
}