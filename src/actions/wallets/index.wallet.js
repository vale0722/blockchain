const { WalletQuery } = require("../../data-access");

module.exports = async function (request) {
  const res = await WalletQuery.index(request);

  if (res.length > 0) {
    return res.map((wallet) => {
      return {
        name: wallet.name,
        amount: wallet.amount
      };
    });
  }

  return {};
};
