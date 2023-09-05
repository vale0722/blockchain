const express = require("express");
const router = express.Router();

router.use("/wallet", require("./wallet"));
router.use("/blockchain", require("./blockchain"));

module.exports = router;
