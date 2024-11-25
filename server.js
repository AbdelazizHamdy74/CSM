const app = require("./app");

const PORT = process.env.PORT || 3000;
const knex = require("./db/knex");
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
