/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("assets", (table) => {
    table.dropForeign("user_id");
    table.dropForeign("contract_id");
    table.dropForeign("product_category_id");
    table.dropForeign("product_sub_category_id");
    table.dropForeign("company_id");
    table.dropForeign("asset_site_id");
    table.dropForeign("service_id");
    table.dropForeign("notes_id");
  });

  await knex.schema.alterTable("assets", (table) => {
    table.string("user_id").nullable().alter();
    table.string("contract_id").nullable().alter();
    table.string("product_category_id").nullable().alter();
    table.string("product_sub_category_id").nullable().alter();
    table.string("company_id").nullable().alter();
    table.string("asset_site_id").nullable().alter();
    table.string("service_id").nullable().alter();
    table.string("notes_id").nullable().alter();
  });

  await knex.schema.alterTable("assets", (table) => {
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("contract_id")
      .references("id")
      .inTable("contracts")
      .onDelete("CASCADE");
    table
      .foreign("product_category_id")
      .references("id")
      .inTable("product_category")
      .onDelete("CASCADE");
    table
      .foreign("product_sub_category_id")
      .references("id")
      .inTable("product_sub_category")
      .onDelete("CASCADE");
    table
      .foreign("company_id")
      .references("id")
      .inTable("company")
      .onDelete("CASCADE");
    table
      .foreign("asset_site_id")
      .references("id")
      .inTable("asset_site")
      .onDelete("CASCADE");
    table
      .foreign("service_id")
      .references("id")
      .inTable("service")
      .onDelete("CASCADE");
    table
      .foreign("notes_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("assets", (table) => {
    table.dropForeign("user_id");
    table.dropForeign("contract_id");
    table.dropForeign("product_category_id");
    table.dropForeign("product_sub_category_id");
    table.dropForeign("company_id");
    table.dropForeign("asset_site_id");
    table.dropForeign("service_id");
    table.dropForeign("notes_id");
  });

  await knex.schema.alterTable("assets", (table) => {
    table.string("user_id").notNullable().alter();
    table.string("contract_id").notNullable().alter();
    table.string("product_category_id").notNullable().alter();
    table.string("product_sub_category_id").notNullable().alter();
    table.string("company_id").notNullable().alter();
    table.string("asset_site_id").notNullable().alter();
    table.string("service_id").notNullable().alter();
    table.string("notes_id").notNullable().alter();
  });

  await knex.schema.alterTable("assets", (table) => {
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("contract_id")
      .references("id")
      .inTable("contracts")
      .onDelete("CASCADE");
    table
      .foreign("product_category_id")
      .references("id")
      .inTable("product_category")
      .onDelete("CASCADE");
    table
      .foreign("product_sub_category_id")
      .references("id")
      .inTable("product_sub_category")
      .onDelete("CASCADE");
    table
      .foreign("company_id")
      .references("id")
      .inTable("company")
      .onDelete("CASCADE");
    table
      .foreign("asset_site_id")
      .references("id")
      .inTable("asset_site")
      .onDelete("CASCADE");
    table
      .foreign("service_id")
      .references("id")
      .inTable("service")
      .onDelete("CASCADE");
    table
      .foreign("notes_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
  });
};
