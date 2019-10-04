'use strict';
const sequelize = require('sequelize');
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

  /**
   * 获取首页图书 随机
   * @returns {Promise<{data: *}>}
   */
  async getHomeBook() {
    const { app } = this;
    const sql =
      'SELECT _id,title,summary,author,images FROM book AS t1 JOIN ( SELECT ROUND( RAND( ) * ( SELECT MAX( id ) FROM book ) ) AS id ) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id ASC LIMIT 40';
    // egg-sequelize 原始查询方法
    const result = await app.model.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });

    return {
      data: result
    };
  }

  /**
   * 获取评分>8.5的随机10本书
   * @returns {Promise<{data: *}>}
   */
  async getLeaderBoard() {
    const { app } = this;
    const sql =
      'SELECT _id,title,rating,author,images,tags FROM book AS t1 JOIN ( SELECT ROUND( RAND( ) * ( SELECT MAX( id ) FROM book ) ) AS id ) AS t2 ' +
      'WHERE t1.id >=t2.id  AND rating -> "$.average" >= \'8.5\' ORDER BY t1.id ASC LIMIT 10';
    const result = await app.model.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });

    return {
      data: result
    };
  }
}

module.exports = BookService;
