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

  /**
 * @swagger
 * /xlarge/post/create:
 *  post:
 *    description: Use to create new post
 *    parameters:
 *    -  in: body
 *       name: body
 *       description: "create new post"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/post"
 *    responses:
 *      '200':
 *        description: A successful request with the data of this new post send in json format
 * 
 */

router.post("/create", parseUrlencoded, async (req, res) => {
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
    res.json({ result})
  })
})

  /**
 * @swagger
 * /xlarge/post/delete/post/:id:
 *  delete:
 *    description: Use to delete post
 *    responses:
 *      '200':
 *        description: post is deleted successfully
 * 
 */

router.delete("/delete/post/:id", function (req, resp) {

  mongoose.model("post").findOneAndRemove({
    _id: req.params.id
  },
    function (err, data) {
      if (!err) {
      }
    })

  resp.json("post deleted")
})

  /**
 * @swagger
 * /xlarge/post/update:
 *  post:
 *    description: Use to delete post
 *    parameters:
 *      - name: title
 *        description: updated Title of post
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: content
 *        description: updated content of post
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: category
 *        description: updated category of this post 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: post_id
 *        description: post id which will update
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful request with the data of this updated post send in json format
 * 
 */

router.post("/update", parseUrlencoded, async (req, res) => {

  const { post_id, title, content, category } = req.body
  let result = await post.findOneAndUpdate({ _id: post_id }, { title: title, content: content, category: category })
  res.json({ result})

})


module.exports = router;