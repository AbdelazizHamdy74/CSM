/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("attachment_notes").del();
  await knex("attachment_notes").insert([
    { id: "an1", notes_id: "n1", images: "image1.jpg", isDeleted: false },
    { id: "an2", notes_id: "n2", images: "image2.jpg", isDeleted: false },
    { id: "an3", notes_id: "n3", images: "image3.jpg", isDeleted: false },
  ]);
};
