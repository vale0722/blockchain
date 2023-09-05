const {processBlockchain} = require("../actions/blockchains");
const { validationResult } = require("express-validator");

module.exports = {
  async process(req, res) {
    const response = {};
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const data = await processBlockchain(req);
        response.status = 201;
        response.body = {
          data,
          message: "Blockchain generado exítosamente",
        };
      } catch (e) {
        response.status = 400;
        response.body = {
          error: e.message,
        };
      }
    } else {
      response.status = 402;
      response.body = { error: errors };
    }

    res.status(response.status).json(response.body);
  }
};
