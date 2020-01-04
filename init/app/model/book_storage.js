/* jshint indent: 2 */

module.exports = app => {
  const { STRING, INTEGER, ENUM } = app.Sequelize;
  return app.model.define('book_storage', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'id',
      },
    },
    label: {
      type: STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    location: {
      type: STRING(255),
      allowNull: false,
    },
    status: {
      type: ENUM('0', '1', '2'),
      allowNull: false,
      defaultValue: '1',
    },
    reservation: {
      type: ENUM('0', '1', '2'),
      allowNull: true,
      defaultValue: '0',
    },
    booking_person: {
      type: INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    tableName: 'book_storage',
  });
};
