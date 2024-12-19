// Bcrypt
const bcrypt = require("bcrypt");

// Returns a hashed version of the provided plaintext password
async function hashPassword(plaintextPassword) {
  // Set the salt rounds
  const saltRounds = 12;
  // Generate the salt
  const salt = await bcrypt.genSalt(saltRounds);
  // Return the hashed password
  return await bcrypt.hash(plaintextPassword, salt);
}

module.exports = {
  hashPassword,
};
