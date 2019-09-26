/* jshint indent: 2 */

module.exports = app => {
  const { STRING, INTEGER, DATE, JSON } = app.Sequelize;
  return app.model.define(
    'admin',
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
      tableName: 'admin'
    }
  );
};
