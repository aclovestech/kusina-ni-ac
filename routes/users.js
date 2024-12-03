// Express promise router
const Router = require("express-promise-router");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const { getUsers } = require("../db/db-users");

const usersRouter = new Router();

// Gets all users if the user is an admin
usersRouter.get("/", checkIsUserAdmin, async (req, res, next) => {
  // Specify joi schema
  const schema = Joi.object({
    role_name: Joi.string().required(),
    perPage: Joi.number().required(),
    currentPage: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    role_name: req.query.role_name.toLowerCase(),
    perPage: req.query.perPage,
    currentPage: req.query.currentPage,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Missing required data", 400);
  }

  // Query: Get all users
  const result = await getUsers(value);

  // Throw an error if the result is empty
  if (result.length === 0) {
    throw new HttpError("No users found", 404);
  }

  // Return the users
  res.status(200).json(result);
});

// Gets a specific user
usersRouter.get("/:userId", async (req, res, next) => {});

// Updates a specific user
usersRouter.put("/:userId", async (req, res, next) => {});

// Deletes a specific user
usersRouter.delete("/:userId", checkIsUserAdmin, async (req, res, next) => {});

function checkIsUserAdmin(req, res, next) {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a seller
  if (role_name !== "Admin") {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
}

module.exports = usersRouter;
