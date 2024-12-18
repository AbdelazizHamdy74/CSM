// file: seeds/03_product_category.js
exports.seed = async function (knex) {
  await knex("product_category").del();
  await knex("product_category").insert([
    { id: "1", name: "Category A", isDeleted: false },
    { id: "2", name: "Category B", isDeleted: false },
    { id: "3", name: "Category C", isDeleted: false },
  ]);
};
