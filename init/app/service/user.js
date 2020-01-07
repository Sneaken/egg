'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class UserService extends Service {
  // 注册
  async register({ username, password, realName, phone, idCard, email }) {
    const { ctx } = this;
    try {
      const isRegister = await ctx.model.User.findOne({
        attributes: [ 'username' ],
        where: {
          username,
        },
      });
      if (isRegister !== null) {
        return {
          isRegister: true,
          data: null,
        };
      }
      const hashPassword = await ctx.genHash(password);
      const result = await ctx.model.User.create({
        username,
        password: hashPassword,
        realName,
        createTime: new Date(),
        phone,
        idCard,
        email,
        competence: '1',
      });
      return {
        data: result,
      };
    } catch (e) {
      console.log(e);
      return {
        message: e,
        data: null,
      };
    }
  }

  // 登录
  async login(username, password) {
    const { ctx } = this;
    const isRegister = await ctx.model.User.findOne({
      attributes: [ 'username', 'password' ],
      where: {
        username,
      },
    });
    if (isRegister === null) {
      return {
        isRegister: false,
        data: null,
      };
    }
    const check = await ctx.compare(password, isRegister.password); // 密码校验
    if (check) {
      return {
        isRegister: true,
        data: await ctx.model.User.findOne({
          attributes: [ 'username', 'competence', 'phone', 'email' ],
          where: {
            username,
          },
        }),
      };
    }
    return {
      isRegister: true,
      data: null,
    };
  }

  // 忘记密码
  async forgetPassword({ username, password }) {
    const { ctx } = this;
    const isRegister = await ctx.model.User.findOne({
      attributes: [ 'username' ],
      where: {
        username,
      },
    });
    if (isRegister === null) {
      return {
        isRegister: false,
        data: null,
      };
    }
    const hashPassword = await ctx.genHash(password);
    const result = await ctx.model.User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          username,
        },
      }
    );
    return {
      isRegister: true,
      data: result,
    };
  }

  // 获取用户个人信息
  async getInfo({ username }) {
    const { ctx } = this;
    return await ctx.model.User.findOne({
      attributes: { exclude: [ 'id', 'password', 'competence' ] },
      where: {
        username,
      },
    });
  }

  // 判断用户是否存在
  async isExists(username) {
    const { ctx } = this;
    const isRegister = await ctx.model.User.findOne({
      attributes: [ 'username', 'password' ],
      where: {
        username,
      },
    });
    return isRegister !== null;
  }

  // 更新用户信息
  async updateUserInfo({ username, attribute, oldValue, newValue }) {
    const { ctx } = this;
    const isExists = await this.isExists(username);
    if (isExists) {
      if (attribute !== 'password') {
        try {
          const result = await ctx.model.User.update(
            {
              [attribute]: newValue,
            },
            {
              where: {
                username,
                [attribute]: oldValue,
              },
            }
          );
          return {
            data: result,
          };
        } catch (e) {
          console.log(e);
        }
      } else {
        const check = await ctx.compare(oldValue, isExists.password); // 密码校验
        if (check) {
          try {
            const result = await ctx.model.User.update(
              {
                [attribute]: newValue,
              },
              {
                where: {
                  username,
                  [attribute]: oldValue,
                },
              }
            );
            return {
              data: result,
            };
          } catch (e) {
            console.log(e);
          }
        } else {
          return {
            data: [ 0 ],
          };
        }
      }
    } else {
      return {
        data: null,
      };
    }
  }

  // 获取用户id
  async getUserId(phone) {
    const { ctx } = this;
    const { id } = await ctx.model.User.findOne({
      attributes: [ 'id' ],
      where: {
        phone,
      },
    });
    return id;
  }

  // 借书
  async borrowBooks(phone, label) {
    const { ctx } = this;
    const data = {};
    const user = await ctx.model.User.findOne({
      attributes: [ 'id', 'status', 'book_number' ],
      where: {
        phone,
      },
    });
    const book = await ctx.model.BookStorage.findOne({
      attributes: [ 'id', 'status' ],
      where: {
        label,
      },
    });
    if (book) {
      if (book.status === '2') {
        data.status = 217;
        data.message = '操作失败，图书已被借出!';
        return data;
      } else if (book.status === '0') {
        data.status = 218;
        data.message = '操作失败，库本无法借阅!';
        return data;
      }
    } else {
      data.status = 219;
      data.message = '图书标号输入错误!';
      return data;
    }
    if (user) {
      if (user.status === '0') {
        // 正常 能借
        if (user.book_number > 0) {
          let transaction;
          try {
            const start = new Date().getTime();
            transaction = await ctx.model.transaction(async t => {
              await ctx.model.BookBorrow.create(
                {
                  label,
                  user_id: user.id,
                  start_time: start,
                  end_time: start + 60 * 24 * 3600 * 1000,
                },
                {
                  transaction: t,
                }
              );
            });
            await ctx.model.BookStorage.update(
              {
                status: '2',
              },
              {
                where: {
                  label,
                },
                transaction,
              }
            );
            data.data = await ctx.model.User.update(
              {
                book_number: user.book_number - 1,
              },
              {
                where: {
                  id: user.id,
                },
                transaction,
              }
            );
            return data;
          } catch (e) {
            ctx.logger.error(e);
            data.status = 220;
            data.message = '操作失败，请重试!';
          }
        } else {
          data.status = 221;
          data.message = '用户借阅已达上限!';
        }
      } else {
        // 不能借阅
        data.status = 222;
        data.message = '用户尚有图书逾期未归还，请先归还!';
      }
    } else {
      data.status = 223;
      data.message = '用户信息输入错误!';
    }
    return data;
  }
}

module.exports = UserService;
