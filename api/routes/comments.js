const express = require("express");
const router = express.Router();
const knex = require("../../connection");
const commentSchema = require("../schemas/comment");

// Comment of individual tweet
router.get("/:tweetid", async (req, res) => {
  const id = req.params.tweetid;
  const comments = await knex("Comments")
    .join("Users", "Users.UserId", "=", "Comments.UserId")
    .where("TweetId", "=", id);
  res.json(comments);
});

// Create comment
router.post("/create", async (req, res) => {
  const body = req.body;
  body.UserId = req.user.UserId;
  body.Date = Date.now();

  if (!commentSchema.validate(body).error) {
    const commentId = await knex.insert([body]).into("Comments");
    const comment = await knex("Comments")
      .join("Users", "Users.UserId", "=", "Comments.UserId")
      .where("CommentId", "=", commentId[0]);
    res.json(comment);
  } else {
    res.status(400).json(commentSchema.validate(body).error.details[0]);
  }
});

module.exports = router;
