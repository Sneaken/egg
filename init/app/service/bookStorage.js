'use strict';
const sequelize = require('sequelize');
const Service = require('egg').Service;
const OP = require('sequelize').Op;
class BookStorageService extends Service {
  // async bookReservation(label) {
  //   const { app, ctx } = this;
  //   const data = {};
  //   const result = await ctx.model.BookStorage.findOne({
  //     attributes: [ 'reservation' ],
  //     where: {
  //       label,
  //     },
  //   });
  //   if (result.reservation === '1') {
  //     // 预约
  //
  //   } else if (result.reservation === '0') {
  //     // 没预约
  //
  //   } else {
  //     // 库本 无法预约
  //
  //   }
  //   return data;
  //   // const sql = `SELECT label,location,status,reservation,booking_person FROM book_storage WHERE label = ${label} `;
  //   // const result = await app.model.query(sql, {
  //   //   type: sequelize.QueryTypes.SELECT,
  //   // });
  //   //
  //   // return {
  //   //   data: result,
  //   // };
  // }
}

module.exports = BookStorageService;
