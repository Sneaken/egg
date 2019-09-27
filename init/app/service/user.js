'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class UserService extends Service {
  // async register(user) {
  //   const { ctx } = this;
  //   const result = await ctx.model.User.findAll({
  //     attributes: { exclude: ['password'] },
  //     where: {
  //       username,
  //       password
  //     }
  //   });
  //   return {
  //     data: result
  //   };
  // }

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
