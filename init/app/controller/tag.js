'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async createTag() {
    const { ctx } = this;

    const result = await ctx.service.tag.create(ctx.request.query);
    if (result.isExist) {
      ctx.body = {
        status: 209,
        message: '标签已存在！'
      };
      return false;
    }
    if (result.data !== null) {
      ctx.body = {
        status: 200,
        message: '标签添加成功！'
      };
    } else {
      ctx.body = {
        status: 201,
        message: '标签添加失败！' + result.message
      };
    }
  }
}

module.exports = TagController;
