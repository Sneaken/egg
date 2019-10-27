'use strict';
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class CommonService extends Service {
  // 产生验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 90,
      height: 35,
      background: '#eccc68'
    });
    this.ctx.session.code = captcha.text.toLowerCase();
    return captcha;
  }

  async getVerifyCode() {
    return this.ctx.session.code; //获得session中的验证码
  }
}

module.exports = CommonService;
