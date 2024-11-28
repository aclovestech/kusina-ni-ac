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

// Router
const mountRoutes = require("./routes/index");

const app = express();

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Config
const sessionConfig = {
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // 1 hour cookie max age
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "development" ? false : true,
  },
};

// Session Management Middleware
app.use(session(sessionConfig));

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

// Mount all routes
mountRoutes(app);

// Error Handling Middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
