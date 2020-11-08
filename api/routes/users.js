const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const knex = require("../../connection");
const registerSchema = require("../schemas/register");
const loginSchema = require("../schemas/login");

// List of users
router.get("/", async (req, res) => {
  const users = await knex("Users");
  res.json(users);
});

// Register user
router.post("/register", async (req, res) => {
  const body = req.body;
  if (!registerSchema.validate(body).error) {
    const login = await knex("Users").where("login", "=", body.login);

    if (!login.length) {
      const inserted = await knex.insert([body]).into("Users");

      res.json({
        message: "login created",
      });
    } else {
      res.status(400).json({
        message: "login already exists",
      });
    }
  } else {
    res.status(400).json(registerSchema.validate(body).error.details[0]);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const body = req.body;

  if (loginSchema.validate(body).error) {
    res.status(401).json({
      message: "Auth error",
    });
    return;
  }

  const login = await knex("Users").where("login", "=", body.login);

  if (login.length > 0 && body.password == login[0].password) {
    const token = await jwt.sign(login[0], process.env.JWT_SECRET, {
      expiresIn: "1800s",
    });

    res.json({ token });
  } else {
    res.status(401).json({
      message: "Auth error",
    });
  }
});

module.exports = router;
