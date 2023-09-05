const { blockchain, transaction, wallet } = require("../models/persistence");

const create = async function () {
  try {
    return await blockchain.create({});
  } catch (e) {
    console.log("Error: ", e);
  }
};

const getLast = async function () {
  try {
    return await wallet.findOne({
      order: [
        ['created_at', 'DESC']
      ]
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const index = async function () {
  try {
    return await blockchain.findAll({
      include: [
        { model: transaction, as: "transactions" },
      ],
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const update = async function (model, data) {
  try {
    return await model.update({
      after_hash: data.after_hash,
      hash: data.hash,
      nonce: data.nonce,
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

module.exports = {
  create,
  index,
  getLast,
  update
};
