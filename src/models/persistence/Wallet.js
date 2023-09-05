"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate({ models }) {
    }
  }
  Wallet.init(
    {
      name: DataTypes.STRING(70),
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "wallet",
    }
  );
  return Wallet;
};
