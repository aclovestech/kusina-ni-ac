// Imports
const express = require("express");
const passport = require("./config/passport-config");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const responseTime = require("response-time");
const compression = require("compression");
const env = require("./config/environment");
const mountRoutes = require("./routes/index.routes");

const app = express();

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());

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
    message: "An error occurred while processing your request.",
  });
});

// Start the server
const PORT = env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
