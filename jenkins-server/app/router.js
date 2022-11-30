'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // 配置接口
  router.get('/config', controller.config.list);
  router.get('/config/detail', controller.config.detail);
  router.post('/config', controller.config.save);
  router.put('/config/:id', controller.config.update);
  router.delete('/config/:id', controller.config.delete);

  // jenkins构建接口
  router.post('/build/:id', controller.jenkins.build);

  // socket.io
  io.of('/jenkins').route('client_connect', io.controller.jenkins.connect);
};
