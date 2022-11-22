'use strict';

const { Controller } = require('egg');
// const { RESPONSE_CODE } = require('../constant');
const jenkins = require('../../jenkins');

class JenkinsController extends Controller {
  async build() {
    const data = await jenkins.info();

    console.log(data);
  }
}

module.exports = JenkinsController;
