const { WalletQuery } = require("../../data-access");

module.exports = async function (request) {
  const model = await WalletQuery.show(request.params.id);
  const res = await WalletQuery.update(model, {
    name: request.body.name,
    amount: request.body.amount,
  });
  return {
    name: res.name,
    amount: res.amount
  };
};
