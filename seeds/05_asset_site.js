// file: seeds/05_asset_site.js
exports.seed = async function (knex) {
  await knex("asset_site").del();
  await knex("asset_site").insert([
    { id: "1", company_id: "1", name: "Site A", isDeleted: false },
    { id: "2", company_id: "2", name: "Site B", isDeleted: false },
    { id: "3", company_id: "3", name: "Site C", isDeleted: false },
  ]);
};
