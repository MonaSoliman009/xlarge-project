var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require('mongoose')

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});

var {
  author
} = require("../models/author");

var {
  post
} = require("../models/post");


router.post("/posting/create", parseUrlencoded, async (req, res) => {
  const { title, content, category, createdby } = req.body

  const post1 = new post({
    _id: mongoose.Types.ObjectId(),
    title: title,
    content: content,
    category: category,
    createdby: createdby
  })

  result = await post1.save()
  let author1 = await author.findOne({ _id: createdby })
  author1.post.push(post1._id)
  fresult = await author1.save((err, data) => {
    res.json({ result: data, error: err })
  })
})

router.post("posting/delete", parseUrlencoded, async (req, res) => {
  const { _id } = req.body
  let result = await post.remove({ _id: _id })
  resp.json("post is deleted")
})

router.post("posting/update", parseUrlencoded, async (req, res) => {

  const { post_id, title, content, category } = req.body
  let result = await post.findOneAndUpdate({ _id: post_id }, { title: title, content: content, category: category })
  resp.json({ result: result })

})


module.exports = router;