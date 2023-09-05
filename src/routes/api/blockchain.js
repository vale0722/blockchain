const { BlockchainController } = require("../../controllers");
const router = require("express").Router();

const BlockchainRequest = require("../../requests/blockchain.request");
router.post("/", ...BlockchainRequest.store, BlockchainController.process);

module.exports = router;
