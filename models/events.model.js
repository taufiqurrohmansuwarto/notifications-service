const { Model } = require('objection')
const knex = require('../knex')

Model.knex(knex)

class Event extends Model {
    static get tableName() {
        return 'events'
    }
}

module.exports = Event