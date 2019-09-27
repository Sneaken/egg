'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class UserService extends Service {
  //注册
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

  //登录
  async login(username, password) {
    const { ctx } = this;
    const isRegister = await ctx.model.User.findOne({
      attributes: ['username', 'competence'],
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
    const check = await ctx.compare(password, await ctx.genHash(password)); //密码校验
    if (check) {
      return {
        isRegister: true,
        data: isRegister
      };
    } else {
      return {
        isRegister: true,
        data: null
      };
    }
  }
}

module.exports = UserService;
