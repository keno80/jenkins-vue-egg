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

  if (!isExist) return jenkins.job.create(config.projectName, jenkinsConfig);

  return Promise.reject(new Error('项目已存在'));
  //
  // return jenkins.job.config(config.projectName, jenkinsConfig);
};

// 删除jenkins项目
const destroyJob = async name => {
  return jenkins.job.destroy(name);
};

// 构建jenkins项目
const buildJob = async name => {
  return jenkins.job.build(name);
};

module.exports = {
  createJob,
  destroyJob,
  buildJob,
};
