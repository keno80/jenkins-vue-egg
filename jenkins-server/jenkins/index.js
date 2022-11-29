const Jenkins = require('jenkins');
const getXML = require('./jenkinsXML');

const config = {
  user: 'keno',
  token: '11ceec05d29301ce0a73b3e36e586062ac',
  instance: 'localhost:8081',
};

const jenkins = new Jenkins({
  baseUrl: `http://${config.user}:${config.token}@${config.instance}`,
  promisify: true,
});

// 新建jenkins项目
const createJob = async config => {
  const isExist = await jenkins.job.exists(config.projectName);
  const jenkinsConfig = getXML(config);

  // console.log(isExist);

  if (!isExist) return await jenkins.job.create(config.projectName, jenkinsConfig);

  return Promise.reject(new Error('项目已存在'));
  //
  // return jenkins.job.config(config.projectName, jenkinsConfig);
};

// 删除jenkins项目
const destroyJob = async name => {
  return await jenkins.job.destroy(name);
};

// 构建jenkins项目
const buildJob = async name => {
  return await jenkins.job.build(name);
};

// 获取构建buildNumber
const waitForBuildNumber = buildId => {
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const item = await jenkins.queue.item(buildId);
        if (item.executable) {
          resolve(item.executable.number);
          clearInterval(timer);
        } else if (item.cancelled) {
          clearInterval(timer);
          reject;
        }
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

// 获取jenkins构建日志流
const getLogStream = (jobName, buildNumber) => {
  const logStream = jenkins.build.logStream(jobName, buildNumber, 'text', 1000);

  logStream.on('data', text => {
    console.log(text); // 打印 text 验证日志获取情况
  });

  logStream.on('error', err => {
    console.log('error', err);
  });

  logStream.on('end', () => {
    console.log('end');
  });

};

module.exports = {
  createJob,
  destroyJob,
  buildJob,
  waitForBuildNumber,
  getLogStream,
};
