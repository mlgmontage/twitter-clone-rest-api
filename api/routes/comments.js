const express = require("express");
const router = express.Router();
const knex = require("../../connection");
const commentSchema = require("../schemas/comment");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const comments = await knex("Comments")
    .join("Users", "Users.UserId", "=", "Comments.UserId")
    .where("TweetId", "=", id);
  res.json(comments);
});

router.post("/create", async (req, res) => {
  const body = req.body;
  body.UserId = req.user.UserId;

  if (!commentSchema.validate(body).error) {
    const comment = await knex.insert([body]).into("Comments");
    res.json(comment);
  } else {
    res.json(commentSchema.validate(body));
  }
});

module.exports = router;
