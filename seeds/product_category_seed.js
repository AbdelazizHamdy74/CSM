/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("product_category").del();
  await knex("product_category").insert([
    { id: "pc1", name: "Laptops", isDeleted: false },
    { id: "pc2", name: "Phones", isDeleted: false },
    { id: "pc3", name: "Accessories", isDeleted: false },
  ]);
};
