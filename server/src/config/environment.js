// Dotenv
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
  SECRET_KEY: process.env.SECRET_KEY,
  SERVER_PORT: process.env.SERVER_PORT,
  CLIENT_URL: process.env.CLIENT_URL,
};
