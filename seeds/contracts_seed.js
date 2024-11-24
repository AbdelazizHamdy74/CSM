/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("contracts").del();
  await knex("contracts").insert([
    {
      id: "con1",
      guiId: "guid1",
      company_id: "c1",
      service_id: "s1",
      notes_id: "n1",
      period: "12 months",
      status: "Active",
      isDeleted: false,
    },
    {
      id: "con2",
      guiId: "guid2",
      company_id: "c2",
      service_id: "s2",
      notes_id: "n2",
      period: "24 months",
      status: "Active",
      isDeleted: false,
    },
    {
      id: "con3",
      guiId: "guid3",
      company_id: "c3",
      service_id: "s3",
      notes_id: "n3",
      period: "6 months",
      status: "Down",
      isDeleted: false,
    },
  ]);
};
