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
      "Tweets.Date",
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
      "Tweets.Date",
      "Users.name",
      "Users.lastname",
      "Users.login",
      "Users.UserId"
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
      "Tweets.Date",
      "Users.UserId",
      "Users.name",
      "Users.lastname",
      "Users.login"
    )
    .where("Tweets.UserId", "=", userid)
    .orderBy("Tweets.TweetId", "desc");

  res.json(tweet);
});

// Create tweet
router.post("/create", async (req, res) => {
  const body = req.body;
  const user = req.user;
  body.UserId = user.UserId;
  body.Date = new Date().toISOString();

  if (!tweetSchema.validate(body).error) {
    const insertedId = await knex.insert([body]).into("Tweets");
    const inserted = await knex("Tweets")
      .join("Users", "Tweets.UserId", "=", "Users.UserId")
      .select(
        "Tweets.TweetId",
        "Tweets.Tweet",
        "Tweets.Date",
        "Users.UserId",
        "Users.name",
        "Users.lastname",
        "Users.login"
      )
      .where("TweetId", "=", insertedId[0]);

    res.json(inserted);
  } else {
    res.status(400).json(tweetSchema.validate(body).error.details[0]);
  }
});

module.exports = router;
