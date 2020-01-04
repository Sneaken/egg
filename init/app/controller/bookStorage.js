'use strict';

const Controller = require('egg').Controller;

class BookStorageController extends Controller {
  // async bookReservation() {
  //   const { ctx } = this;
  //   const { label } = ctx.request.body;
  //   const result = await ctx.service.bookStorage.bookReservation(label);
  //   if (result.data.length !== 0) {
  //     ctx.body = Object.assign(result, {
  //       status: 200,
  //       message: '查询成功！',
  //     });
  //   } else {
  //     ctx.body = Object.assign(result, {
  //       status: 207,
  //       message: '暂无数据！',
  //     });
  //   }
  // }
}

module.exports = BookStorageController;
