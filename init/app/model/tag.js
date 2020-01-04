/* jshint indent: 2 */
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return app.model.define(
    'tag',
    {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING(20),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: false,
      tableName: 'tag',
    }
  );
};
