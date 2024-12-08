/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("company", (table) => {
    table.string("id", 36).primary();
    table.string("name", 255).notNullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("service", (table) => {
    table.string("id", 36).primary();
    table.string("name", 255).notNullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("product_category", (table) => {
    table.string("id", 36).primary();
    table.string("name").notNullable();
    // table.string("description").nullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("product_sub_category", (table) => {
    table.string("id", 36).primary();
    table
      .string("product_category_id", 36)
      .references("id")
      .inTable("product_category")
      .onDelete("CASCADE");
    table.string("name", 255).notNullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("asset_site", (table) => {
    table.string("id", 36).primary();
    table
      .string("company_id", 36)
      .references("id")
      .inTable("company")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("users", (table) => {
    table.string("id", 36).primary();
    table.string("HrId", 36).unique();
    table
      .string("company_id", 36)
      .references("id")
      .inTable("company")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.enu("role", ["Admin", "Customer", "Support"]).notNullable();
    table.string("phone", 15).unique().notNullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("notes", (table) => {
    table.string("id", 36).primary();
    table
      .string("users_id", 36)
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("text").nullable();
    // table.json("images").nullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("contracts", (table) => {
    table.string("id", 36).primary();
    table.string("guiId", 36).unique();
    table
      .string("company_id", 36)
      .references("id")
      .inTable("company")
      .onDelete("CASCADE");
    table
      .string("service_id", 36)
      .references("id")
      .inTable("service")
      .onDelete("CASCADE");
    table
      .string("notes_id", 36)
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.string("period", 50).notNullable();
    table.enu("status", ["Active", "Down"]).defaultTo("Active");
    table.string("status_reason", 255).nullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("attachment_notes", (table) => {
    table.string("id", 36).primary();
    table
      .string("notes_id", 36)
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.string("images", 255).nullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("assets", (table) => {
    table.string("id", 36).primary();
    table.string("guiId", 36).unique();
    table
      .string("user_id", 36)
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .string("contract_id", 36)
      .nullable()
      .references("id")
      .inTable("contracts")
      .onDelete("CASCADE");
    table
      .string("product_category_id", 36)
      .nullable()
      .references("id")
      .inTable("product_category")
      .onDelete("CASCADE");
    table
      .string("product_sub_category_id", 36)
      .nullable()
      .references("id")
      .inTable("product_sub_category")
      .onDelete("CASCADE");
    table
      .string("company_id", 36)
      .nullable()
      .references("id")
      .inTable("company")
      .onDelete("CASCADE");
    table
      .string("asset_site_id", 36)
      .nullable()
      .references("id")
      .inTable("asset_site")
      .onDelete("CASCADE");
    table
      .string("service_id", 36)
      .nullable()
      .references("id")
      .inTable("service")
      .onDelete("CASCADE");
    table
      .string("notes_id", 36)
      .nullable()
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.enu("asset_type", ["Hardware", "Software"]).notNullable();
    table.string("asset_name", 255).notNullable();
    table.string("serial_number", 255).notNullable().unique();
    table.boolean("supported").notNullable();
    table
      .enum("status", ["New", "In Inventory", "Deployed", "Decommissioned"])
      .notNullable();
    table.string("priority", ["High", "Medium", "Low"]).notNullable();
    table.string("attach_image", 255).nullable();
    table.string("description", 1000).nullable();
    table.boolean("isDeleted").defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("assets");
  await knex.schema.dropTableIfExists("attachment_notes");
  await knex.schema.dropTableIfExists("contracts");
  await knex.schema.dropTableIfExists("notes");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("asset_site");
  await knex.schema.dropTableIfExists("product_sub_category");
  await knex.schema.dropTableIfExists("product_category");
  await knex.schema.dropTableIfExists("service");
  await knex.schema.dropTableIfExists("company");
};
