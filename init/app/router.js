'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/verify', app.controller.common.verify);
  router.get('/api/book/findAll', controller.book.findAll);
  router.get('/api/book/findSimple', controller.book.findSimpleByKeywords);
  router.get('/api/book/getInfo', controller.book.getInfo);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/register', controller.user.register);
};
