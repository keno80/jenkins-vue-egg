'use strict';

const { Service } = require('egg');

class ConfigService extends Service {
  async list() {
    const { model } = this.app;
    return await model.Config.find();
  }

  async save(data) {
    const { model } = this.app;
    return await new model.Config(data).save();
  }

  async update(id, data) {
    const { model } = this.app;
    return await model.Config.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    const { model } = this.app;
    return await model.Config.findByIdAndDelete(id);
  }
}

module.exports = ConfigService;
