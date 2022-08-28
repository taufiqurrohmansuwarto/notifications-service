/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.uuid("id").primary();
    table.integer("from");
    table.integer("to");
    table.uuid("event_id");
    table.boolean("seen_by_user").defaultTo(false);
    // untuk menambahkan custom id pada suatu tabel. misal ketika dibutuhkan untuk esign maka document id yang ditaruh disini guna mempercepat pencarian
    table.string("additional_custom_id");
    table.timestamps("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
