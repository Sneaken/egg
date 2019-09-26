'use strict';

const Service = require('egg').Service;
const OP = require('sequelize').Op;
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
  //
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
    return {
      isRegister: true,
      data: await ctx.model.User.findOne({
        attributes: ['username', 'competence'],
        where: {
          username,
          password
        }
      })
    };
  }
}

module.exports = UserService;
