// file: seeds/07_notes.js
exports.seed = async function (knex) {
  await knex("notes").del();
  await knex("notes").insert([
    { id: "1", users_id: "1", text: "Note for User A", isDeleted: false },
    { id: "2", users_id: "2", text: "Note for User B", isDeleted: false },
    { id: "3", users_id: "3", text: "Note for User C", isDeleted: false },
  ]);
};
