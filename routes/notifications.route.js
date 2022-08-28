const express = require("express");
const {
  createNotification,
  getNotifications,
  updateNotification,
} = require("../controller/notifications.controller");
const { pegawaiRequiredInquery, bodyInNotifications } = require("../validator");

const router = express.Router();

// add validator
router
  .route("/")
  .get(...pegawaiRequiredInquery, getNotifications)
  .post(...bodyInNotifications, createNotification);

router.route("/:id").patch(...pegawaiRequiredInquery, updateNotification);

module.exports = router;
