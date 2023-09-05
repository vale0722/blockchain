"use strict";
const {Statuses} = require("../../constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      block_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "blockchains",
          key: "id",
        },
      },
      issuer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "wallets",
          key: "id",
        },
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "wallets",
          key: "id",
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(Statuses)),
        default: Statuses.PENDING
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
    await queryInterface.dropTable("wallets");
  },
};
