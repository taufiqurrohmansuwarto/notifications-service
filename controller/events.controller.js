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
        const page = req?.query?.page || 1;
        const limit = req?.query?.limit || 50;

        const notifications = await Notification.query().where('to', to).andWhere('seen_by_user', is_read).withGraphFetched('event').page(parseInt(page) - 1, limit).orderBy('created_at', 'desc');

        const data = {
            meta: {
                page: parseInt(page),
                limit: parseInt(limit),
            }, data: notifications.results
        };

        res.json(data)
    } catch (error) {
        console.log(error);
        res.boom.badRequest('error');
    }
}
