'use strict';
const sequelize = require('sequelize');
const Service = require('egg').Service;
const OP = require('sequelize').Op;
class BookBookingService extends Service {
  async bookReservation(label, phone) {
    const { app, ctx } = this;
    const data = {};
    const result = await ctx.model.BookStorage.findOne({
      attributes: [ 'reservation' ],
      where: {
        label,
      },
    });
    if (result.reservation === '1') {
      // 预约
      data.message = '图书已被预约！';
      data.status = 214;
    } else if (result.reservation === '2') {
      // 库本 无法预约
      data.message = '库本无法预约';
      data.status = 213;
    } else if (result.reservation === '0') {
      // 没预约
      // 事物操作 托管事务(auto-callback)
      let transaction;
      try {
        const { id } = await ctx.model.User.findOne({
          attributes: [ 'id' ],
          where: {
            phone,
          },
        });
        transaction = await ctx.model.transaction(async t => {
          await ctx.model.BookStorage.update(
            {
              reservation: '1',
              booking_person: id,
            },
            {
              where: {
                label,
              },
              transaction: t,
            }
          );
        });
        const startTime = new Date().getTime();
        data.data = await ctx.model.BookBooking.create(
          {
            label,
            user_id: id,
            start_time: startTime,
            end_time: startTime + 7 * 24 * 3600 * 1000,
          },
          {
            transaction,
          }
        );
        // await transaction.commit();
      } catch (err) {
        // 事务已被回滚
        ctx.logger.error(err);
        // await transaction.rollback();
      }
    }
    return data;
  }
}

module.exports = BookBookingService;
