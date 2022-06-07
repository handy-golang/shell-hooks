import path from 'path';
import Ssh2SftpClient from 'ssh2-sftp-client';
import chalk from 'chalk';

const AppPath = path.resolve();
const staticPath = path.join(AppPath, 'dist');
const Config = {
  host: 'file.mo7.cc',
  port: '22',
  username: 'root',
  password: 'asdasd55555',
  remotePath: '/root/ProdProject/file.mo7.cc/ShellHooks',
  localPath: staticPath,
};

let sftp = new Ssh2SftpClient('blog');

// https://www.npmjs.com/package/ssh2-sftp-client
sftp
  .connect(Config)
  .then(() => {
    return sftp.exists(Config.remotePath);
  })
  .then((res) => {
    if (res) {
      console.info(chalk.yellow('清理远程目录...'));
      return sftp.rmdir(Config.remotePath, true);
    } else {
      console.info(chalk.bgCyan('目录不存在....'));
    }
  })
  .then(() => {
    console.info(chalk.blue('创建远程目录....'));
    return sftp.mkdir(Config.remotePath, true);
  })
  .then(() => {
    console.info(chalk.blue('开始上传文件....'));
    return sftp.uploadDir(Config.localPath, Config.remotePath);
  })
  .then(() => {
    console.info(chalk.bgGreen('上传完毕'));
    sftp.end();
  })
  .catch((err) => {
    console.error(chalk.red(`Error: ${err.message}`));
  });
sftp.on('upload', (info) => {
  console.info(chalk.blue('Upload'), chalk.green(info.source));
  sftp.chmod(info.destination, 0o777);
});
