'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/config', controller.config.list);
  router.post('/config', controller.config.save);
  router.put('/config/:id', controller.config.update);
  router.delete('/config/:id', controller.config.delete);
};
