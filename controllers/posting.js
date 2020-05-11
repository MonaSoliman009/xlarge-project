var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require('mongoose')
const path = require('path');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'ddo2kzwbh', 
  api_key: '431946565525743', 
  api_secret: '8gmOkgnY8RHDLRuAMf52CufXAOc' 
});
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '/upload/'));
  },
  filename: function(req, file, cb) {
    cb(null,  file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});

var {user} = require('../models/user')
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

router.post("/create", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  const result = await cloudinary.v2.uploader.upload(req.file.path)

  const newPost = new post({
    _id: mongoose.Types.ObjectId(),
    title: title,
    content: content,
    category: category,
    createdby: createdby,
    img:result.secure_url
  })

  resultt = await newPost.save()
  let user1 = await user.findOne({ _id: createdby })
  user1.post.push(newPost._id)
  fresult = await user1.save((err, data) => {
    res.json({ resultt})
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

router.delete("/delete/:id", function (req, resp) {

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
 * /xlarge/post/update/:id:
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

router.post("/update/:id", parseUrlencoded, async (req, res) => {

  const {  title, content, category,img } = req.body
  let result = await post.findOneAndUpdate({ _id: req.params.id }, { title: title, content: content, category: category,img:img })
  res.json({ result})

})


  /**
 * @swagger
 * /xlarge/post/list:
 *  get:
 *    description: Use to retrieve All Posts  
 *    responses:
 *      '200':
 *        description: A successful request with the data of all posts send in json format
 * 
 */


router.get("/list", async (req, res) => {
  let result = await post.find({});
  res.json(result)


})


module.exports = router;