/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("company").del();
  await knex("company").insert([
    { id: "c1", name: "Company One", isDeleted: false },
    { id: "c2", name: "Company Two", isDeleted: false },
    { id: "c3", name: "Company Three", isDeleted: false },
  ]);
};
