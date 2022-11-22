'use strict';

const { Controller } = require('egg');
const { RESPONSE_CODE } = require('../constant');
const { buildJob } = require('../../jenkins');

class JenkinsController extends Controller {
  async build() {
    const { id } = this.ctx.params;

    try {
      const { projectName } = await this.service.config.detail(id);
      await buildJob(projectName);

      this.ctx.body = {
        code: RESPONSE_CODE.SUCCESS_CODE,
        msg: '构建指令执行成功',
        data: null,
      };
    } catch (e) {
      this.ctx.body = {
        code: RESPONSE_CODE.ERROR_CODE,
        msg: '构建指令执行失败',
        data: null,
      };
    }
  }
}

module.exports = JenkinsController;
