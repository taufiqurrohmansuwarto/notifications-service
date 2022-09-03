const express = require("express");
const { index } = require("../controller/events.controller");
const router = express.Router();

router.route("/").get(index);

module.exports = router;
