'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      playerOneId: Sequelize.INTEGER,
      playerTwoId: Sequelize.INTEGER,
      winnerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      matchInfo: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['', '', '', '', '', ''],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  },
};
