'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/verify', controller.common.verify);
  router.get('/api/book/findAll', controller.book.findAll);
  router.get('/api/book/findSimple', controller.book.findSimpleByKeywords);
  router.get('/api/book/getHomeBook', controller.book.getHomeBook);
  router.get('/api/book/getLeaderBoard', controller.book.getLeaderBoard);
  router.get('/api/book/getInfo', controller.book.getInfo);
  router.get('/api/book/getLocation', controller.book.getLocation);
  router.get('/api/book/getBookingInfo', controller.book.getBookingInfo);
  router.post('/api/bookBooking/bookReservation', controller.bookBooking.bookReservation);
  router.get('/api/user/getUserInfo', controller.user.getUserInfo);
  router.get('/api/tag/create', controller.tag.createTag);
  router.get('/api/user/getToken', controller.user.getToken);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/forgetPassword', controller.user.forgetPassword);
  router.post('/api/user/updateUserInfo', controller.user.updateUserInfo);
};
