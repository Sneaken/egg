/* jshint indent: 2 */

module.exports = app => {
  const { STRING, INTEGER, TEXT, FLOAT, JSON } = app.Sequelize;
  return app.model.define(
    'book',
    {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      _id: {
        type: STRING(255),
        allowNull: true,
        unique: true
      },
      title: {
        type: STRING(512),
        allowNull: false
      },
      subtitle: {
        type: STRING(255),
        allowNull: true
      },
      summary: {
        type: TEXT,
        allowNull: false
      },
      author: {
        type: JSON,
        allowNull: false
      },
      authorIntro: {
        type: TEXT,
        allowNull: false
      },
      publisher: {
        type: STRING(255),
        allowNull: false
      },
      altTitle: {
        type: STRING(255),
        allowNull: true
      },
      originTitle: {
        type: STRING(255),
        allowNull: true
      },
      translator: {
        type: STRING(255),
        allowNull: true
      },
      pubDate: {
        type: STRING(255),
        allowNull: false
      },
      pages: {
        type: INTEGER(11),
        allowNull: true
      },
      tags: {
        type: JSON,
        allowNull: true
      },
      catalog: {
        type: TEXT,
        allowNull: false
      },
      image: {
        type: STRING(255),
        allowNull: true
      },
      binding: {
        type: STRING(255),
        allowNull: true
      },
      isbn10: {
        type: STRING(10),
        allowNull: true
      },
      isbn13: {
        type: STRING(13),
        allowNull: false
      },
      price: {
        type: FLOAT,
        allowNull: true,
        defaultValue: '0.00'
      },
      rating: {
        type: JSON,
        allowNull: false
      },
      images: {
        type: JSON,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: false,
      tableName: 'book'
    }
  );
};
