import { createJenkins } from 'jenkins';

const config = {
  user: 'keno',
  token: '11ceec05d29301ce0a73b3e36e586062ac',
  instance: 'localhost:8081',
};

const jenkins = createJenkins({
  baseUrl: `http://${config.user}:${config.token}@${config.instance}`,
  promisify: true,
});

export default jenkins;
