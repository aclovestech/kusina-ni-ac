// dotenv
const dotenv = require("dotenv");
// Determine which .env file to load based on NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

// Node-postgres
const pg = require("pg");

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("[PG] Executed Query:", {
    text,
    duration,
    rows: res.rowCount,
  });
  return res;
};

const getClient = async () => {
  return pool.connect();
};

module.exports = {
  query,
  getClient,
};
