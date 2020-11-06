const express = require("express")
const router = express.Router()
const knex = require("../../connection")

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const comments = await knex("Comments").where('TweetId', '=', id)
  res.json(comments)
})

module.exports = router