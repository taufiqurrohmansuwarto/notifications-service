const Event = require("../models/events.model");
module.exports.index = async (req, res) => {
  try {
    const result = await Event.query();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.boom.badRequest("Error");
  }
};
module.exports.create = async (req, res) => {};
module.exports.update = async (req, res) => {};
module.exports.delete = async (req, res) => {};
