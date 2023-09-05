const { WalletQuery } = require("../../data-access");

module.exports = async function (request) {
  const res = await WalletQuery.create({
    name: request.body.name,
    amount: request.body.amount,
  });
  return {
    name: res.name,
    amount: res.amount
  };
};
