// Dotenv
const dotenv = require("dotenv");
// Determine which .env file to load based on NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

// Express
const express = require("express");
// Middlewares
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const responseTime = require("response-time");
const compression = require("compression");
const errorhandler = require("errorhandler");

// Node-postgres (pg)
const db = require("./db/index");

const app = express();

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Management Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// CORS Middleware
app.use(cors());

// Logging Middleware
app.use(morgan("combined"));

// Response Time Middleware
app.use(responseTime());

// Security Middleware
app.use(helmet());

// Compression Middleware
app.use(compression());

// Simple Route
app.get("/", (req, res) => {
  res.status(200).send();
});

// Error Handling Middleware (should be last)
app.use(errorhandler());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
