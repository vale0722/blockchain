const { transaction } = require("../models/persistence");

const create = async function (data) {
  try {
    return await transaction.create({
      block_id: data.block_id,
      issuer_id: data.issuer_id,
      receiver_id: data.receiver_id,
      amount: data.amount,
      status: data.status,
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

module.exports = {
  create
};
