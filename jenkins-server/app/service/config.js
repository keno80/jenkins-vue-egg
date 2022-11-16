'use strict';

const { Service } = require('egg');

class ConfigService extends Service {
  async save(data) {
    const { model } = this.app;
    return await new model.Config(data).save();
  }

  async update(id, data) {
    const { model } = this.app;
    return await model.Config.findByIdAndUpdate(id, data);
  }
}

module.exports = ConfigService;
