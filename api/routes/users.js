const express = require("express")
const router = express.Router()
const knex = require("../../connection")
const registerSchema = require("../schemas/register")

router.get('/', async (req, res) => {
  const users = await knex("Users")
  res.json(users)
})

router.post('/register', async (req, res) => {
  const body = req.body
  if(!registerSchema.validate(body).error) {

    const inserted = await knex.insert([body]).into("Users")
    res.json(inserted)
  } else {
    res.json(registerSchema.validate(body))
  }
})

module.exports = router