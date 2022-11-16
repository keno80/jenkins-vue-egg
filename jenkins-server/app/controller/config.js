'use strict';

const { Controller } = require('egg');
const { RESPONSE_CODE } = require('../constant');

class ConfigController extends Controller {
  async save() {
    const { ctx } = this;
    const { body } = ctx.request;

    try {
      await this.service.config.save(body);

      ctx.body = {
        code: RESPONSE_CODE.SUCCESS_CODE,
        msg: '配置保存成功',
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: RESPONSE_CODE.ERROR_CODE,
        msg: '配置保存失败',
        data: null,
      };
    }
  }

  async update() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { id } = ctx.params;

    try {
      await this.service.config.update(id, body);

      ctx.body = {
        code: RESPONSE_CODE.SUCCESS_CODE,
        msg: '配置更新成功',
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: RESPONSE_CODE.ERROR_CODE,
        msg: '配置更新失败',
        data: null,
      };
    }
  }
}

module.exports = ConfigController;
