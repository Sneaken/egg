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
}

module.exports = UserService;
