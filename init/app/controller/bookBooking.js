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
}

module.exports = BookBookingController;
