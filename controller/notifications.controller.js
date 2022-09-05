const Notification = require("../models/notifications.model");
const { validationResult } = require("express-validator");
const { uniqBy, uniq } = require("lodash");
const { getEmployees } = require("../utils/services");

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

    // it must be filter by type
    const { pegawai_id: to } = req?.query;
    const type = req?.query?.type || "esign";
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 50;

    const notifications = await Notification.query()
      .where("to", to)
      .withGraphFetched("event")
      .where("event_id", "like", `${type}%`)
      .page(parseInt(page) - 1, limit)
      .orderBy("created_at", "desc");

    const notificationNotSeen = await Notification.query()
      .where("to", to)
      .andWhere("seen_by_user", false)
      .andWhere("event_id", "like", `${type}%`)
      .count();

    const fromUser = uniqBy(notifications.results, "from");
    const toUser = uniqBy(notifications.results, "to");

    const users = [...fromUser, ...toUser];

    const listUsersWithInfo = await getEmployees(users);
    const notificationsWithUserInfo = notifications?.results?.map((notif) => {
      return {
        from_user: listUsersWithInfo?.find((user) => user?.id === notif?.from),
        to_user: listUsersWithInfo?.find((user) => user?.id === notif?.to),
        ...notif,
      };
    });

    const data = {
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      data: {
        results: notificationsWithUserInfo,
        total: notifications.total,
        totalNotSeen: notificationNotSeen[0].count,
      },
    };

    res.json(data);
  } catch (error) {
    console.log(error);
    res.boom.badRequest("error");
  }
};

module.exports.totalReadFalseNotification = async (req, res) => {
  try {
    const { pegawai_id } = req?.query;
    const type = req?.query?.type || "esign";

    const result = await Notification.query()
      .count()
      .where("to", pegawai_id)
      .andWhere("seen_by_user", false)
      .andWhere("event_id", "like", `${type}%`);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.boom.badRequest("error", error);
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
