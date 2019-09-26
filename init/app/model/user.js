/* jshint indent: 2 */
module.exports = app => {
  const { STRING, INTEGER, CHAR, JSON, DATE } = app.Sequelize;
  return app.model.define(
    'user',
    {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING(32),
        allowNull: false
      },
      password: {
        type: STRING(64),
        allowNull: false
      },
      realName: {
        type: STRING(64),
        allowNull: false
      },
      phone: {
        type: CHAR(11),
        allowNull: true
      },
      idCard: {
        type: CHAR(18),
        allowNull: true
      },
      email: {
        type: STRING(18),
        allowNull: true
      },
      createTime: {
        type: DATE,
        allowNull: false
      },
      competence: {
        type: JSON,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: false,
      tableName: 'user'
    }
  );
};
