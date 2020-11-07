const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const knex = require("../../connection");
const registerSchema = require("../schemas/register");

router.get("/", async (req, res) => {
  const users = await knex("Users");
  res.json(users);
});

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
      res.json({
        message: "login already exists",
      });
    }
  } else {
    res.json(registerSchema.validate(body));
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const login = await knex("Users").where("login", "=", body.login);

  if (login.length > 0 && body.password == login[0].password) {
    const token = await jwt.sign(login[0], process.env.JWT_SECRET, {
      expiresIn: "1800s",
    });

    res.json({ token });
  } else {
    res.json({
      message: "Auth error",
    });
  }
});

module.exports = router;
