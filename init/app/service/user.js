'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class UserService extends Service {
  // 注册
  async register(user) {
    const { ctx } = this;
    const { username, password, realName, phone, idCard, email } = user;
    const hashPassword = await ctx.genHash(password);
    try {
      const result = await ctx.model.User.create({
        attributes: { exclude: ['password'] },
        where: {
          username,
          password: hashPassword,
          realName,
          phone,
          idCard,
          email,
          competence: '1'
        }
      });
      return {
        data: result
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        message: e
      };
    }
  }

  // 登录
  async login(username, password) {
    const { ctx } = this;
    const isRegister = await ctx.model.User.findOne({
      attributes: ['username', 'password'],
      where: {
        username
      }
    });
    if (isRegister === null) {
      return {
        isRegister: false,
        data: null
      };
    }
    const check = await ctx.compare(password, isRegister.password); //密码校验
    if (check) {
      return {
        isRegister: true,
        data: await ctx.model.User.findOne({
          attributes: ['username', 'competence'],
          where: {
            username
          }
        })
      };
    } else {
      return {
        isRegister: true,
        data: null
      };
    }
  }

  // 忘记密码
  async forgetPassword(user) {
    const { ctx } = this;
    const isRegister = await ctx.model.User.findOne({
      attributes: ['username'],
      where: {
        username: user.username
      }
    });
    if (isRegister === null) {
      return {
        isRegister: false,
        data: null
      };
    }
    const hashPassword = await ctx.genHash(user.password);
    const result = await ctx.model.User.update(
      {
        password: hashPassword
      },
      {
        where: {
          username: user.username
        }
      }
    );
    return {
      isRegister: true,
      data: result
    };
  }
}

module.exports = UserService;
