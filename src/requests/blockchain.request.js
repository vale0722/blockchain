const { body } = require('express-validator');
const crypto = require('crypto');
const { WalletQuery } = require("../data-access");

const walletExists = async (name) => {
  let wallet = await WalletQuery.findByName(name)
  return !!wallet.id;
};

const getIssuerAmount = async (issuer) => {
  let wallet = await WalletQuery.findByName(issuer)
  return wallet.amount;
};

module.exports = {
  store: [
    body('auth').custom((value) => {
      return value === crypto.createHash('sha256').update('blockchain').digest('hex');
    }).withMessage('Autenticación invalida'),
    body('transactions.*.issuer')
        .custom(async (value) => await walletExists(value))
        .withMessage('El issuer no existe en la entidad wallet'),
    body('transactions.*.receiver')
        .custom(async (value, { req, location, path }) => {
          const issuer = req.body.transactions[path.match(/\[(\d+)\]/)[1]].issuer;
          return value !== issuer && await walletExists(value);
        }).withMessage('El receiver no existe en la entidad wallet o es igual al issuer'),
    body('transactions.*.amount')
        .isNumeric()
        .withMessage('El monto debe ser un número')
        .custom(async (value, { req, location, path }) => {
          const issuerAmount = await getIssuerAmount(req.body.transactions[path.match(/\[(\d+)\]/)[1]].issuer);
          return Number(value) <= issuerAmount;
        })
        .withMessage('El issuer no tiene suficiente monto')
  ],
};