'use strict';

const Controller = require('egg').Controller;

class BookBookingController extends Controller {
  async bookReservation() {
    const { ctx } = this;
    const { label, phone } = ctx.request.body;
    const result = await ctx.service.bookBooking.bookReservation(label, phone);
    if (result.data) {
      ctx.body = Object.assign(result, {
        status: 200,
        message: '预约成功！',
      });
    } else {
      ctx.body = result;
    }
  }

  async bookingHistory() {
    const { ctx } = this;
    const { phone } = ctx.query;
    const result = await ctx.service.bookBooking.bookingHistory(phone);
    if (result.data) {
      ctx.body = Object.assign(result, {
        status: 200,
        message: '查询成功！',
      });
    } else {
      ctx.body = {
        status: 207,
        message: '暂无数据！',
      };
    }
  }

  async cancelBooking() {
    const { ctx } = this;
    const { phone, label } = ctx.request.body;
    const result = await ctx.service.bookBooking.cancelBooking(label, phone);
    if (result.data === 1) {
      ctx.body = {
        status: 200,
        message: '操作成功！',
      };
    } else {
      ctx.body = result;
    }
  }
}

module.exports = BookBookingController;
