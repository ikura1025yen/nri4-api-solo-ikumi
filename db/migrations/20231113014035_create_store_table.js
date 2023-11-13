/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("store", function (table) {
    table.increments("id").primary();
    table.string("store_name", 32);
    table.string("region", 32);
    table.string("photo_path", 100);
    table.date("date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("store");
};
