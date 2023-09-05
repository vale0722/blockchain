"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blockchains", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      after_hash: {
        allowNull: true,
        type: Sequelize.STRING(70),
      },
      hash: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      nonce: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blockchains");
  },
};
