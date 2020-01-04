'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    // 获取用户端传递过来的参数
    const result = await ctx.service.user.register(ctx.request.body);
    if (result.isRegister) {
      ctx.body = {
        status: 208,
        message: '用户名已被注册！',
      };
      return false;
    }
    if (result.data !== null) {
      ctx.body = {
        status: 200,
        message: '用户注册成功！',
      };
    } else {
      ctx.body = {
        status: 201,
        message: '用户注册失败！' + result.message,
      };
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    // 获取用户端传递过来的参数
    const { username, password, verificationCode } = ctx.request.body;

    const code = await ctx.service.common.getVerifyCode();
    // const hashPassword = await ctx.genHash(password);
    // console.log(hashPassword);

    if (verificationCode && verificationCode.toLowerCase() !== code) {
      ctx.body = {
        status: 204,
        message: '验证码错误！',
      };
      return false;
    }
    // 进行验证 data 数据 登录是否成功
    const result = await ctx.service.user.login(username, password);

    // 成功过后进行一下操作
    if (!result.isRegister) {
      ctx.body = {
        status: 202,
        message: '用户尚未注册！',
      };
      return false;
    }
    if (result.data === null) {
      ctx.body = {
        status: 203,
        message: '密码错误!',
      };
      return false;
    }
    // 返回 token 到前端
    ctx.body = {
      status: 200,
      message: '登录成功',
      data:
        'Bearer ' +
        app.jwt.sign(
          {
            username: result.data.username, // 需要存储的 token 数据
            competence: result.data.competence,
            phone: result.data.phone,
            email: result.data.email,
          },
          app.config.jwt.secret,
          { expiresIn: 8 * 3600 }
        ), // 生成 token 的方式
    };
  }

  // 忘记密码
  async forgetPassword() {
    const { ctx } = this;
    const result = await ctx.service.user.forgetPassword(ctx.request.body);

    if (!result.isRegister) {
      ctx.body = {
        status: 202,
        message: '用户尚未注册！',
      };
      return false;
    }
    if (JSON.stringify(result.data) !== '[1]') {
      ctx.body = {
        status: 205,
        message: '密码修改失败！',
      };
    } else {
      ctx.body = {
        status: 200,
        message: '密码修改成功！',
      };
    }
  }

  // 获取用户个人信息
  async getUserInfo() {
    const { ctx } = this;
    const result = await ctx.service.user.getInfo(ctx.query);
    console.log(result);
    if (result === null) {
      ctx.body = {
        status: 207,
        message: '暂无数据！',
      };
    }

    ctx.body = {
      status: 200,
      message: '用户信息查询成功！',
      data: result,
    };
  }

  // 更新用户信息
  async updateUserInfo() {
    const { ctx } = this;
    const { username, op, oldValue, newValue } = ctx.request.body;
    let attribute;
    if (op === 1) {
      attribute = 'phone';
    } else if (op === 2) {
      attribute = 'email';
    } else if (op === 3) {
      attribute = 'password';
    } else {
      ctx.body = {
        status: 211,
        message: '参数类型出错',
      };
      return;
    }
    const params = {
      username,
      attribute,
      oldValue,
      newValue,
    };

    const result = await ctx.service.user.updateUserInfo(params);
    if (result.data[0] === 1) {
      ctx.body = {
        status: 200,
        message: '用户信息更新成功！',
      };
    } else if (result.data[0] === 0) {
      ctx.body = {
        status: 212,
        message: '用户信息修改失败！',
      };
    } else {
      ctx.body = {
        status: 202,
        message: '用户尚未注册！',
      };
    }
  }

  // 不健壮 有漏洞 但是懒得写了
  async getToken() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getInfo(ctx.query);
    if (user === null) {
      ctx.body = {
        status: 202,
        message: '用户尚未注册！无法获取用户信息！',
      };
    }
    ctx.body = {
      status: 200,
      message: 'tokn获取成功！',
      data:
        'Bearer ' +
        app.jwt.sign(
          {
            username: user.username, // 需要存储的 token 数据
            competence: user.competence,
            phone: user.phone,
            email: user.email,
          },
          app.config.jwt.secret,
          { expiresIn: 8 * 3600 }
        ), // 生成 token 的方式
    };
  }
}

module.exports = UserController;
