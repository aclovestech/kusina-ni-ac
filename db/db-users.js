// DB (Knex)
const { func } = require("joi");
const knex = require(".");
// HttpError
const HttpError = require("../utils/HttpError");

const getUsers = async ({ role_name, perPage, currentPage }) => {
  // Set the perPage to 100 if it's greater than 100
  if (perPage > 100) perPage = 100;
  try {
    // Query: Get the users
    let result;
    switch (role_name) {
      // Return only the users that are customers
      case "customer": {
        result = await knex("users.users")
          .select("users.*")
          .leftJoin("customers.customer_details", function () {
            this.on("users.user_id", "=", "customer_details.customer_id");
          })
          .where("users.role_id", 3)
          .paginate({
            perPage: perPage,
            currentPage: currentPage,
          });
        break;
      }
      // Return only the users that are sellers
      case "seller": {
        result = await knex("users.users")
          .select("*")
          .leftJoin("sellers.seller_details", function () {
            this.on("users.user_id", "=", "seller_details.seller_id");
          })
          .where("users.role_id", 2)
          .paginate({
            perPage: perPage,
            currentPage: currentPage,
          });
        break;
      }
      // Return only the users that are admins
      case "admin": {
        result = await knex("users.users")
          .select("users.*")
          .leftJoin("admins.admin_details", function () {
            this.on("users.user_id", "=", "admin_details.admin_id");
          })
          .where("users.role_id", 1)
          .paginate({
            perPage: perPage,
            currentPage: currentPage,
          });
        break;
      }
      // Throw an error if the role name is invalid
      default: {
        throw new HttpError("Invalid role name", 400);
      }
    }

    // Return the data from the response
    return result.data;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError(err.message, 400);
  }
};

module.exports = { getUsers };
