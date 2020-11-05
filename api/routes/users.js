const express = require("express")
const router = express.Router()
const knex = require("../../connection")

router.get('/', async (req, res) => {
  const users = await knex("Users")
  res.json(users)
})

router.post('/register', async (req, res) => {
  const body = req.body
  const inserted = await knex.insert([body]).into("Users")
  res.json(inserted)
})

module.exports = router