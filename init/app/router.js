'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/verify', controller.common.verify);
  router.get('/api/book/findAll', controller.book.findAll);
  router.get('/api/book/findSimple', controller.book.findSimpleByKeywords);
  router.get('/api/book/getHomeBook', controller.book.getHomeBook);
  router.get('/api/book/getLeaderBoard', controller.book.getLeaderBoard);
  router.get('/api/book/getInfo', controller.book.getInfo);
  router.get('/api/user/getUserInfo', controller.user.getUserInfo);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/forgetPassword', controller.user.forgetPassword);
};
