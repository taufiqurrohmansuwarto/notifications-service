const Notification = require('../models/notifications.model');

module.exports.createNotification = async (req, res) => {
    try {
        const { from, to, event_id } = req?.body;
        await Notification.create({ from, to, event_id });
        res.json({ code: 200, message: 'success' })

    } catch (error) {
        console.log(error);
        res.boom.badRequest('error');
    }
}

module.exports.getNotifications = async (req, res) => {
    try {
        const { pegawai_id: to } = req?.query;
        const notifications = await Notification.query().where('to', to).withGraphFetched('event');
        res.json(notifications)
    } catch (error) {
        console.log(error);
        res.boom.badRequest('error');
    }
}
