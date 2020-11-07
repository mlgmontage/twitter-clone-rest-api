const express = require("express");
const router = express.Router();
const knex = require("../../connection");
const tweetSchema = require("../schemas/tweet");

// List of tweets
router.get("/", async (req, res) => {
  const tweets = await knex("Tweets")
    .join("Users", "Tweets.UserId", "=", "Users.UserId")
    .select(
      "Tweets.TweetId",
      "Tweets.Tweet",
      "Users.name",
      "Users.lastname",
      "Users.login",
      "Users.UserId"
    )
    .orderBy("Tweets.TweetId", "desc");

  res.json(tweets);
});

// Individual tweet
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tweet = await knex("Tweets")
    .join("Users", "Tweets.UserId", "=", "Users.UserId")
    .select(
      "Tweets.TweetId",
      "Tweets.Tweet",
      "Users.name",
      "Users.lastname",
      "Users.login"
    )
    .where("Tweets.TweetId", "=", id);

  res.json(tweet);
});

// Tweets of individual user
router.get("/user/:userid", async (req, res) => {
  const userid = req.params.userid;
  const tweet = await knex("Tweets")
    .join("Users", "Tweets.UserId", "=", "Users.UserId")
    .select(
      "Tweets.TweetId",
      "Tweets.Tweet",
      "Users.UserId",
      "Users.name",
      "Users.lastname",
      "Users.login"
    )
    .where("Tweets.UserId", "=", userid);

  res.json(tweet);
});

// Create tweet
router.post("/create", async (req, res) => {
  const body = req.body;
  const user = req.user;
  body.UserId = user.UserId;

  if (!tweetSchema.validate(body).error) {
    const inserted = await knex.insert([body]).into("Tweets");

    res.json(inserted);
  } else {
    res.json(tweetSchema.validate(body));
  }
});

module.exports = router;
