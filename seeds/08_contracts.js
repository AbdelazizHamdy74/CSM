// file: seeds/08_contracts.js
exports.seed = async function (knex) {
  await knex("contracts").del();
  await knex("contracts").insert([
    {
      id: "1",
      company_id: "1",
      service_id: "1",
      period: "2024-2025",
      status: "Active",
      isDeleted: false,
    },
    {
      id: "2",
      company_id: "2",
      service_id: "2",
      period: "2023-2024",
      status: "Down",
      isDeleted: false,
    },
    {
      id: "3",
      company_id: "3",
      service_id: "3",
      period: "2022-2023",
      status: "Active",
      isDeleted: false,
    },
  ]);
};
