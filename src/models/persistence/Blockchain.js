"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blockchain extends Model {
    static associate({ models }) {
      Blockchain.hasMany(models.transaction, {
        foreignKey: "block_id",
        as: "transactions",
      });
    }
  }
  Blockchain.init(
    {
      after_hash: DataTypes.STRING(255),
      hash: DataTypes.STRING(255),
      nonce: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "blockchain",
    }
  );
  return Blockchain;
};
