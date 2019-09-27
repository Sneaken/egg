/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569233979870_9838';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'library',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '924393527',
    timezone: '+08:00'
  };

  config.security = {
    domainWhiteList: ['127.0.0.1:8080'], //允许访问接口的白名单
    csrf: {
      enable: false
    }
  };

  config.cors = {
    // origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.jwt = {
    enable: true,
    secret: 'secretKey',
    ignore: ['/api/user/login', '/api/verify']
  };

  config.bcrypt = {
    saltRounds: 10 // default 10
  };

  return {
    ...config,
    ...userConfig
  };
};
