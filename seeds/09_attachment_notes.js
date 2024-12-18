// file: seeds/09_attachment_notes.js
exports.seed = async function (knex) {
  await knex("attachment_notes").del();
  await knex("attachment_notes").insert([
    { id: "1", notes_id: "1", images: "image1.jpg", isDeleted: false },
    { id: "2", notes_id: "2", images: "image2.jpg", isDeleted: false },
    { id: "3", notes_id: "3", images: "image3.jpg", isDeleted: false },
  ]);
};
