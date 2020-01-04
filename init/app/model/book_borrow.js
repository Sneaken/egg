/* jshint indent: 2 */

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;
  return app.model.define('book_borrow', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book_storage',
        key: 'label',
      },
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    start_time: {
      type: DATE,
      allowNull: false,
    },
    end_time: {
      type: DATE,
      allowNull: false,
    },
    restart_time: {
      type: DATE,
      allowNull: true,
    },
    restart_count: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '0',
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
    tableName: 'book_borrow',
  });
};
