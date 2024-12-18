// file: seeds/02_service.js
exports.seed = async function (knex) {
  await knex("service").del();
  await knex("service").insert([
    { id: "1", name: "Service A", isDeleted: false },
    { id: "2", name: "Service B", isDeleted: false },
    { id: "3", name: "Service C", isDeleted: false },
  ]);
};
