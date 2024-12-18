// file: seeds/04_product_sub_category.js
exports.seed = async function (knex) {
  await knex("product_sub_category").del();
  await knex("product_sub_category").insert([
    {
      id: "1",
      product_category_id: "1",
      name: "Sub Category A",
      isDeleted: false,
    },
    {
      id: "2",
      product_category_id: "2",
      name: "Sub Category B",
      isDeleted: false,
    },
    {
      id: "3",
      product_category_id: "3",
      name: "Sub Category C",
      isDeleted: false,
    },
  ]);
};
