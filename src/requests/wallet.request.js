const { body } = require("express-validator");
const { WalletQuery } = require("../data-access");
const crypto = require("crypto");

module.exports = {
  store: [
    body('auth').custom((value) => {
        return value === crypto.createHash('sha256').update('blockchain').digest('hex');
    }).withMessage('Autenticación invalida'),
    body("name")
      .isString()
      .notEmpty()
      .isLength({ max: 70 })
      .custom((value, { req }) => {
        return WalletQuery.findByName(value).then((wallet) => {
          if ((wallet?.id !== req?.id) || (!req.id && wallet)) {
            return Promise.reject("El nombre ya está en uso");
          }
        });
      }),
    body("amount").isNumeric().notEmpty()
  ],
};
