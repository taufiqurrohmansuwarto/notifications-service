const { query, body } = require("express-validator");

module.exports.pegawaiRequiredInquery = [
  query("pegawai_id")
    .isString()
    .notEmpty()
    .withMessage("pegawai_id is required"),
  query("type")
    .isString()
    .notEmpty()
    .default("esign")
    .withMessage("type is required"),
];

module.exports.bodyInNotifications = [
  body("from").isNumeric().notEmpty().withMessage("from is required"),
  body("to").isNumeric().notEmpty().withMessage("to is required"),
  body("event_id").isNumeric().notEmpty().withMessage("event_id is required"),
];
