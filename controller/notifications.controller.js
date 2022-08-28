const Notification = require("../models/notifications.model");
const { validationResult } = require("express-validator");

module.exports.createNotification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { from, to, event_id } = req?.body;
    await Notification.query().insert({
      from,
      to,
      event_id,
    });
    res.json({ code: 200, message: "success" });
  } catch (error) {
    console.log(error);
    res.boom.badRequest("error");
  }
};

module.exports.getNotifications = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { pegawai_id: to } = req?.query;
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 50;

    const notifications = await Notification.query()
      .where("to", to)
      .withGraphFetched("event")
      .page(parseInt(page) - 1, limit)
      .orderBy("created_at", "desc");

    const data = {
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      data: notifications.results,
    };

    res.json(data);
  } catch (error) {
    console.log(error);
    res.boom.badRequest("error");
  }
};

module.exports.updateNotification = async (req, res) => {
  try {
    // merubah seen_by_user menjadi true
    const { id } = req?.params;
    const { pegawai_id } = req?.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    await Notification.query()
      .patch({ seen_by_user: true })
      .where("id", id)
      .andWhere("to", pegawai_id)
      .first();
    res.json({ code: 200, message: "update success" });
  } catch (error) {
    console.log(error);
    res.boom.badReques("error");
  }
};
