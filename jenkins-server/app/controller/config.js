'use strict';

const { Controller } = require('egg');
const { RESPONSE_CODE } = require('../constant');

class ConfigController extends Controller {
  async save() {
    const { ctx } = this;
    const { body } = ctx.request;

    console.log(body);

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
}

module.exports = ConfigController;
