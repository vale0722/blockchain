const { WalletController } = require("../../controllers");
const router = require("express").Router();
const WalletRequest = require("../../requests/wallet.request");

router.get("/", WalletController.index);
router.post("/", ...WalletRequest.store, WalletController.store);

module.exports = router;
