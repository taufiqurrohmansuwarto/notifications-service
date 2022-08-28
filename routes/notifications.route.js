const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  res.json({ code: 200, message: "success" });
});

module.exports = router;
