const express = require("express")
const router = express.Router()
const knex = require("../../connection")

router.get('/', async (req, res) => {
  const users = await knex("Users")
  res.json(users)
})

module.exports = router