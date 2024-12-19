// Dotenv
const dotenv = require("dotenv");
// Determine which .env file to load based on NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });
// JSON Web Token
const jwt = require("jsonwebtoken");
// HttpError
const HttpError = require("../utils/HttpError");

// Generates a JSON Web Token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

// Verifies a JSON Web Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new HttpError("Unauthorized", 401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) throw new HttpError("Invalid Bearer Token", 403);
    req.user = user;
    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
