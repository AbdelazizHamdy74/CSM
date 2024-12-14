exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("password");
  });
};
