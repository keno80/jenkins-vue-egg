import { createJenkins } from 'jenkins';

const config = {
  user: '',
  token: '',
  instance: '',
};

const jenkins = createJenkins({
  baseUrl: `http://${config.user}:${config.token}@${config.instance}`,
  promisify: true,
});

export default jenkins;
