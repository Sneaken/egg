'use strict';

const Service = require('egg').Service;
const OP = require('sequelize').Op;
class BookService extends Service {
  /**
   * 查询所有
   * @returns {Promise<{data: *}>}
   */
  async findAll() {
    const { ctx } = this;
    const result = await ctx.model.Book.findAll({
      attributes: { exclude: ['id'] }
    });
    return {
      data: result
    };
  }

  /**
   * 通过列名模糊查询
   * @param category 列名
   * @param keywords 关键词
   * @returns {Promise<{data: *}>}
   */
  async findByKeywords(category, keywords) {
    const { ctx } = this;
    const result = await ctx.model.Book.findAll({
      attributes: { exclude: ['id'] },
      where: {
        [category]: {
          [OP.like]: `%${keywords}%`
        }
      }
    });
    return {
      data: result
    };
  }

  /**
   * 获取书籍详细信息
   * @param _id 豆瓣ID
   * @returns {Promise<{data: *}>}
   */
  async findOne(_id) {
    const { ctx } = this;
    const result = await ctx.model.Book.findAll({
      attributes: { exclude: ['id'] },
      where: {
        _id
      }
    });
    return {
      data: result
    };
  }
}

module.exports = BookService;
