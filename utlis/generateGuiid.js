const knex = require("../../db/knex");
generateGuiId = async (modelName = "assets", prefix = "ASSET") => {
  const idLength = 10;
  let number = 0;
  let newId = 0;
  let remainZerosLength = 0;
  let finalGuiId = prefix;
  let status = "new";
  const count = await knex(modelName).count("id as totalCount");
  number = count[0].totalCount;
  newId = ++number;
  remainZerosLength = idLength - newId.toString().length;
  for (let index = 0; index < remainZerosLength; index++) {
    finalGuiId += "0";
  }
  finalGuiId += newId.toString(); // Correct way to convert number to string

  return finalGuiId;
};

module.exports = generateGuiId;
