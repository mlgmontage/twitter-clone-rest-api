const express = require("express")
const router = express.Router()
const knex = require("../../connection")
const tweetSchema = require('../schemas/tweet')

router.get('/', async (req, res) => {
  const tweets = await knex("Tweets")
    .join('Users', 'Tweets.UserId', '=', 'Users.UserId')
    .select('Tweets.TweetId', 'Tweets.Tweet', 'Users.name', 'Users.lastname', 'Users.login')
    .orderBy('Tweets.TweetId', 'desc');

  res.json(tweets)
})

router.post('/create', async (req, res) => {
  const body = req.body

  if(!tweetSchema.validate(body).error) {
    const inserted = await knex.insert([body]).into("Tweets")
    res.json(inserted)
  } else {
    res.json(tweetSchema.validate(body))
  }
})

module.exports = router