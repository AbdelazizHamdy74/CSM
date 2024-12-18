// file: seeds/06_users.js
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: "1",
      HrId: "HR001",
      company_id: "1",
      name: "User A",
      password: "passwordA",
      email: "userA@example.com",
      role: "Admin",
      phone: "1234567890",
      isDeleted: false,
    },
    {
      id: "2",
      HrId: "HR002",
      company_id: "2",
      name: "User B",
      password: "passwordB",
      email: "userB@example.com",
      role: "Customer",
      phone: "0987654321",
      isDeleted: false,
    },
    {
      id: "3",
      HrId: "HR003",
      company_id: "3",
      name: "User C",
      password: "passwordC",
      email: "userC@example.com",
      role: "Support",
      phone: "1122334455",
      isDeleted: false,
    },
  ]);
};
