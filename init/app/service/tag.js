'use strict';
const Service = require('egg').Service;

class TagService extends Service {
  async create({ name }) {
    const { ctx } = this;
    try {
      const isExist = await ctx.model.Tag.findOne({
        attributes: ['name'],
        where: {
          name
        }
      });
      if (isExist !== null) {
        return {
          isExist: true,
          data: null
        };
      }
      const result = await ctx.model.Tag.create({
        name
      });
      return {
        data: result
      };
    } catch (e) {
      console.log(e);
      return {
        message: e,
        data: null
      };
    }
  }
}

module.exports = TagService;
