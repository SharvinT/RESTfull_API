const express = require("express");
const router = require("express").Router();
const Posts = require("../model/Post");
const verify = require('../router/verifyToken');

router.post("/", (req, res) => {
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});
router.post("/", async (req, res) => {
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const SavedPost = await post.save();
    res.json(SavedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/",verify,async (req, res) => {
  try {
    const post = await Posts.find();
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:postId", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Posts.deleteOne({ _id: req.params.postId });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const post = await Posts.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/:postId", async (req, res) => {
  try {
    const post = await Posts.update(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
