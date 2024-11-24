/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("notes").del();
  await knex("notes").insert([
    { id: "n1", users_id: "u1", text: "Note for user 1", isDeleted: false },
    { id: "n2", users_id: "u2", text: "Note for user 2", isDeleted: false },
    { id: "n3", users_id: "u3", text: "Note for user 3", isDeleted: false },
  ]);
};
