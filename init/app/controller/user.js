'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册
  async register() {
    const { ctx, app } = this;
    //获取用户端传递过来的参数
    const result = await ctx.service.user.register(ctx.request.body);

    if (result.data !== null) {
      ctx.body = {
        status: 200,
        message: '用户注册成功！'
      };
    } else {
      ctx.body = {
        status: 201,
        message: '用户注册失败！' + result.message
      };
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    //获取用户端传递过来的参数
    const { username, password, verificationCode } = ctx.request.body;

    const code = await ctx.service.common.getVerifyCode();
    // const hashPassword = await ctx.genHash(password);
    // console.log(hashPassword);

    if (verificationCode.toLowerCase() !== code) {
      ctx.body = {
        status: 204,
        message: '验证码错误！'
      };
      return false;
    }
    // 进行验证 data 数据 登录是否成功
    const result = await ctx.service.user.login(username, password);

    //成功过后进行一下操作
    if (!result.isRegister) {
      ctx.body = {
        status: 202,
        message: '用户尚未注册！'
      };
      return false;
    }
    if (result.data === null) {
      ctx.body = {
        status: 203,
        message: '密码错误!'
      };
      return false;
    }
    // 返回 token 到前端
    ctx.body = {
      status: 200,
      message: '登录成功',
      data: app.jwt.sign(
        {
          username: result.data.username, //需要存储的 token 数据
          competence: result.data.competence
        },
        app.config.jwt.secret,
        { expiresIn: 8 * 3600 }
      ) // 生成 token 的方式
    };
  }

  // 忘记密码
  async forgetPassword() {
    const { ctx } = this;
    const result = await ctx.service.user.forgetPassword(ctx.request.body);

    if (!result.isRegister) {
      ctx.body = {
        status: 202,
        message: '用户尚未注册！'
      };
      return false;
    }
    if (JSON.stringify(result.data) !== '[1]') {
      ctx.body = {
        status: 205,
        message: '密码修改失败！'
      };
    } else {
      ctx.body = {
        status: 200,
        message: '密码修改成功！'
      };
    }
  }
}

module.exports = UserController;
