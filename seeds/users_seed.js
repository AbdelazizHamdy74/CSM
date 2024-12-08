/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: "u1",
      HrId: "HR001",
      company_id: "c1",
      name: "User One",
      role: "Admin",
      phone: "1234567890",
      email:"admin@exp.com",
      password:"Admin@1234",
      isDeleted: false,
    },
    {
      id: "u2",
      HrId: "HR002",
      company_id: "c2",
      name: "User Two",
      role: "Customer",
      phone: "0987654321",
      email:"customer@exp.com",
      password:"Customer@1234",
      isDeleted: false,
    },
    {
      id: "u3",
      HrId: "HR003",
      company_id: "c3",
      name: "User Three",
      role: "Support",
      phone: "1122334455",
      email:"support@exp.com",
      password:"Support@1234",
      isDeleted: false,
    },
  ]);
};
