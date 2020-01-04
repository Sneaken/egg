/* jshint indent: 2 */

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('book_booking', {
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
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    tableName: 'book_booking',
  });
};
