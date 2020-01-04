/* jshint indent: 2 */

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;
  return app.model.define('book_return', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    label: {
      type: STRING(255),
      allowNull: false,
      references: {
        model: 'book_storage',
        key: 'label',
      },
    },
    borrow_time: {
      type: DATE,
      allowNull: false,
    },
    return_time: {
      type: DATE,
      allowNull: false,
    },
    status: {
      type: ENUM('0', '1'),
      allowNull: false,
      defaultValue: '0',
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    tableName: 'book_return',
  });
};
