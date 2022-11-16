'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/config', controller.config.save);
  router.put('/config/:id', controller.config.update);
  // router.delete('/config', controller.config.delete);
};
