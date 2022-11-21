'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 配置接口
  router.get('/config', controller.config.list);
  router.post('/config', controller.config.save);
  router.put('/config/:id', controller.config.update);
  router.delete('/config/:id', controller.config.delete);

  // jenkins构建接口
  router.post('/build', controller.jenkins.build);
};
