'use strict';

const { Service } = require('egg');
// const jenkins = require('../../jenkins');

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

  async detail(id) {
    const { model } = this.app;
    return await model.Config.findById(id);
  }

  async delete(id) {
    const { model } = this.app;
    return await model.Config.findByIdAndDelete(id);
  }
}

module.exports = ConfigService;
