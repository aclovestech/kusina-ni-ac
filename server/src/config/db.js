// Imports
const env = require("./environment");
const { attachPaginate } = require("knex-paginate");

// Knex config
const knex = require("knex")({
  client: "pg",
  connection: {
    host: env.PGHOST,
    database: env.PGDATABASE,
    user: env.PGUSER,
    password: env.PGPASSWORD,
    port: env.PGPORT,
    ssl: {
      require: true,
    },
  },
});

// Setup knex-paginate
attachPaginate();

module.exports = knex;
