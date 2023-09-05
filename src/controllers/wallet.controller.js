const {
  indexWallet,
  storeWallet,
} = require("../actions/wallets");
const { validationResult } = require("express-validator");

module.exports = {
  async index(req, res) {
    const response = {};
    try {
      const wallets = await indexWallet(req);
      response.status = 200;
      response.body = { wallets };
    } catch (e) {
      response.status = 400;
      response.body = {
        error: e.message,
      };
    }
    res.status(response.status).json(response.body);
  },

  async store(req, res) {
    const response = {};
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const wallet = await storeWallet(req);
        response.status = 201;
        response.body = { wallet };
      } catch (e) {
        response.status = 400;
        response.body = {
          error: e.message,
        };
      }
    } else {
      response.status = 402;
      response.body = errors;
    }

    res.status(response.status).json(response.body);
  }
};
