/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('events', table => {
        // contoh misal text diiisi comment kemudian text diisi commented on your post
        // sumber https://stackoverflow.com/questions/29437304/notifications-table-design
        table.uuid('id').primary();
        table.string('type');
        table.text('text');
        table.timestamps('created_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('events');
};
