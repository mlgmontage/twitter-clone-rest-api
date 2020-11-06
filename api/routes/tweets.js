const express = require("express")
const router = express.Router()
const knex = require("../../connection")
const tweetSchema = require('../schemas/tweet')

router.get('/', async (req, res) => {
  const tweets = await knex("Tweets").join('Users', 'Tweets.UserId', '=', 'Users.UserId').select('Tweets.TweetId', 'Tweets.Tweet', 'Users.name', 'Users.lastname')
  res.json(tweets)
})

router.post('/create', async (req, res) => {
  const body = req.body
})

module.exports = router