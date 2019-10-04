'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  async findAll() {
    const { ctx } = this;
    ctx.body = await ctx.service.book.findAll();
  }

  /**
   * 通过分类 简单查询 列表展示
   * @returns {Promise<boolean>}
   */
  async findSimpleByKeywords() {
    const { ctx } = this;
    const { category, keywords } = ctx.query;
    if (category === '' || keywords === '') {
      ctx.body = {
        status: 206,
        message: '检查查询参数,不能为空！'
      };
      return false;
    }
    const result = await ctx.service.book.findByKeywords(category, keywords);
    if (result.length !== 0) {
      ctx.body = Object.assign(result, {
        status: 200,
        message: '查询成功！'
      });
    } else {
      ctx.body = Object.assign(result, {
        status: 207,
        message: '暂无数据！'
      });
    }
  }

  async getInfo() {
    const { ctx } = this;
    const { id } = ctx.query;
    if (id === '') {
      ctx.body = {
        status: 206,
        message: '检查查询参数,不能为空！'
      };
      return false;
    }
    const result = await ctx.service.book.findOne(id);
    if (result.length !== 0) {
      ctx.body = Object.assign(result, {
        status: 200,
        message: '查询成功！'
      });
    } else {
      ctx.body = Object.assign(result, {
        status: 207,
        message: '暂无数据！'
      });
    }
  }

  async getHomeBook() {
    const { ctx } = this;
    const result = await ctx.service.book.getHomeBook();
    if (result.length !== 0) {
      ctx.body = Object.assign(result, {
        status: 200,
        message: '查询成功！'
      });
    } else {
      ctx.body = Object.assign(result, {
        status: 207,
        message: '暂无数据！'
      });
    }
  }
  async getLeaderBoard() {
    const { ctx } = this;
    const result = await ctx.service.book.getLeaderBoard();
    if (result.length !== 0) {
      ctx.body = Object.assign(result, {
        status: 200,
        message: '查询成功！'
      });
    } else {
      ctx.body = Object.assign(result, {
        status: 207,
        message: '暂无数据！'
      });
    }
  }
}

module.exports = BookController;
