'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      playerOneId: DataTypes.INTEGER,
      playerTwoId: DataTypes.INTEGER,
      winnerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      matchInfo: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ['', '', '', '', '', ''],
      },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
