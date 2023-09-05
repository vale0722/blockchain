"use strict";
const { Model } = require("sequelize");
const { Statuses } = require("../../constants");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({ models }) {
      Transaction.belongsTo(models.blockchain, {
        foreignKey: "block_id",
        as: "blockchain",
      });
      Transaction.belongsTo(models.wallet, {
        foreignKey: "issuer_id",
        as: "issuer",
      });
      Transaction.belongsTo(models.wallet, {
        foreignKey: "receiver_id",
        as: "receiver",
      });
    }
  }
  Transaction.init(
    {
      block_id: DataTypes.INTEGER,
      issuer_id: DataTypes.INTEGER,
      receiver_id: DataTypes.INTEGER,
      amount: DataTypes.DOUBLE,
      status: DataTypes.ENUM(Object.values(Statuses)),
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return Transaction;
};
