// file: seeds/01_company.js
exports.seed = async function (knex) {
  await knex("company").del();
  await knex("company").insert([
    { id: "1", name: "Company A", isDeleted: false },
    { id: "2", name: "Company B", isDeleted: false },
    { id: "3", name: "Company C", isDeleted: false },
  ]);
};
