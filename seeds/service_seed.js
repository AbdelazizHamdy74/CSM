/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("service").del();
  await knex("service").insert([
    { id: "s1", name: "Service One", isDeleted: false },
    { id: "s2", name: "Service Two", isDeleted: false },
    { id: "s3", name: "Service Three", isDeleted: false },
  ]);
};
