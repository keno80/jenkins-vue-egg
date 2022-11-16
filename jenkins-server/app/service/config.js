'use strict';

const { Service } = require('egg');

class ConfigService extends Service {
  async save(data) {
    const { app } = this;
    return await new app.model.Config(data).save();
  }
}

module.exports = ConfigService;
