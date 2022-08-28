const { Model } = require("objection");
const knex = require("../knex_connection");
Model.knex(knex);

class Notification extends Model {
  static get tableName() {
    return "notifications";
  }

  static get relationMappings() {
    const Event = require("./events.model");
    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: "notifications.event_id",
          to: "events.id",
        },
      },
    };
  }
}

module.exports = Notification;
