/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("asset_site").del();
  await knex("asset_site").insert([
    { id: "as1", company_id: "c1", name: "Headquarters", isDeleted: false },
    { id: "as2", company_id: "c2", name: "Branch Office", isDeleted: false },
    { id: "as3", company_id: "c3", name: "Remote Location", isDeleted: false },
  ]);
};
