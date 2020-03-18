'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const listGet = [
    {
      url: '/api/verify',
      controller: controller.common.verify,
    },
    {
      url: '/api/book/findAll',
      controller: controller.book.findAll,
    },
    {
      url: '/api/book/findSimple',
      controller: controller.book.findSimpleByKeywords,
    },
    {
      url: '/api/book/getHomeBook',
      controller: controller.book.getHomeBook,
    },
    {
      url: '/api/book/getLeaderBoard',
      controller: controller.book.getLeaderBoard,
    },
    {
      url: '/api/book/getInfo',
      controller: controller.book.getInfo,
    },
    {
      url: '/api/book/getLocation',
      controller: controller.book.getLocation,
    },
    {
      url: '/api/book/getLocation',
      controller: controller.book.getLocation,
    },
    {
      url: '/api/book/getLocation',
      controller: controller.book.getLocation,
    },
    {
      url: '/api/book/getBookingInfo',
      controller: controller.book.getBookingInfo,
    },
    {
      url: '/api/bookBooking/bookingHistory',
      controller: controller.bookBooking.bookingHistory,
    },
    {
      url: '/api/user/getUserInfo',
      controller: controller.user.getUserInfo,
    },
    {
      url: '/api/tag/create',
      controller: controller.tag.createTag,
    },
    {
      url: '/api/user/getToken',
      controller: controller.user.getToken,
    },
  ];
  const listPost = [
    {
      url: '/api/bookBooking/bookReservation',
      controller: controller.bookBooking.bookReservation,
    },
    {
      url: '/api/bookBooking/cancelBooking',
      controller: controller.bookBooking.cancelBooking,
    },
    {
      url: '/api/user/login',
      controller: controller.user.login,
    },
    {
      url: '/api/user/register',
      controller: controller.user.register,
    },
    {
      url: '/api/user/forgetPassword',
      controller: controller.user.forgetPassword,
    },
    {
      url: '/api/user/updateUserInfo',
      controller: controller.user.updateUserInfo,
    },
    {
      url: '/api/user/borrowBook',
      controller: controller.user.borrowBooks,
    },
  ];

  listGet.forEach(item => {
    router.get(item.url, item.controller);
  });
  listPost.forEach(item => {
    router.post(item.url, item.controller);
  });
};
