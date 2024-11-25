/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("product_sub_category").del();
  await knex("product_sub_category").insert([
    {
      id: "psc1",
      product_category_id: "pc1",
      name: "Gaming Laptops",
      isDeleted: false,
    },
    {
      id: "psc2",
      product_category_id: "pc2",
      name: "Smartphones",
      isDeleted: false,
    },
    {
      id: "psc3",
      product_category_id: "pc3",
      name: "Chargers",
      isDeleted: false,
    },
  ]);
};
