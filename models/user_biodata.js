'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user_game, {
        foreignKey: 'userId',
      });
    }
  }
  user_biodata.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      country: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_biodata',
    }
  );
  return user_biodata;
};
