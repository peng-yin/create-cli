
<details>
yarn create <starter-kit-package> [<args>] 是为了统一前端项目脚手架引入的

约定 <starter-kit-package> 为 create- 开头的 npm 包，通过 package.json <bin> 字段对外导出可执行命令用于创建新项目时执行。

当执行 yarn create <starter-kit-package> [<args>] 时，
相当于执行 yarn global add <starter-kit-package>，
只不过前者会自动调用 <starter-kit-package> 里的 bin 命令并透传 args 参数立即开始新项目的生成

$ yarn create react-app <app-name>

$ yarn global add create-react-app
$ create-react-app <app-name>

bin 字段中提供的命令就是脚手架与外界沟通的桥梁，外界通过调用该命令，传递参数，调起脚手架。脚手架执行命令，解析参数，执行项目的生成逻辑。

1. 创建bin 命令入口文件
2. 创建项目后，需要 link 到全局，这样才能本地测试，就像使用正式发布的 npm 包一样调用。yarn unlink可以进行取消
3. 完成 link 后，yarn 会创建可执行命令到对应路径下，具体的路径可通过 yarn global bin 来查看
$ yarn global bin
/usr/local/bin

chmod +x ./bin/cli.js

# install and start

$ yarn global add cli

$ cli create <name> [-f|--force]
$ -f, --force: Overwrite if the target exists

## 工具库

- commander	命令行自定义指令
- inquirer	命令行询问用户问题，记录回答结果
- chalk	控制台输出内容样式美化
- ora	控制台 loading 样式
- download-git-repo	下载远程模版
- fs-extra	系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API
- cross-spawn	支持跨平台调用系统上的命令, 在脚手架里面，可以用来自动执行 shell 命令
- figlet  输出一些特殊的文字，这些文字只包含 ANSI 对应的字符。

1. Yeoman 一个通用的脚手架系统, 实际上是三个工具的总和：

yo --- 脚手架，自动生成工具
grunt、gulp --- 构建工具
bower、npm --- 包管理工具

Yeoman 提供了 yeoman-generator 让我们快速生成一个脚手架模板，我们可以通过各类 Generator 实现任何类型的项目搭建，

```
  npm install yo --global # or yarn global add yo
  npm install generator-node --global # or yarn global add generator-node
  mkdir yo-project
  cd yo-project
  yo node
```
2. plop 小在体积轻量，美在简单易用
</details>
