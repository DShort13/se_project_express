const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { JWT_SECRET } = require("../utils/config");
const {
  DEFAULT,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORISED,
} = require("../utils/errors");
const ConflictError = require("../utils/Errors/ConflictError");

const mongoDuplicateError = 11000;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.message === "User ID not found") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Invalid input, please try again" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email, avatar } = req.body;

  return User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({ name, email, password: hash, avatar })
        .then((user) =>
          res
            .status(201)
            .send({ name: user.name, email: user.email, avatar: user.avatar })
        )
        .catch((err) => {
          console.error(err);
          if (err.code === mongoDuplicateError) {
            res
              .status(409)
              .send({ message: "A user with this email already exists" });
          } else if (err.name === "ValidationError") {
            res
              .status(BAD_REQUEST)
              .send({ message: "Invalid input, please try again" });
          } else {
            res
              .status(DEFAULT)
              .send({ message: "An error has occurred on the server" });
          }
        });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        res
          .status(UNAUTHORISED)
          .send({ message: "Incorrect email or password" });
      }
    });
};

module.exports = { getUsers, getUser, createUser, login };
