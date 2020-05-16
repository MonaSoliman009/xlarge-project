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

var {categories}=require("../models/category")
var {web,validateweb}=require("../models/web")
var {android,validateandroid}=require("../models/Applicationdevelopment")

var {testing,validatetesting}=require("../models/Miscellaneousfields")
var {opensource,validateopensource}=require("../models/opensource")
var {competitive,validatecompetitive}=require("../models/competitive")
var {machine,validatemachine}=require("../models/machinelearning")
var {data,validatedata}=require("../models/datascience")
  /**
 * @swagger
 * /xlarge/post/create/web:
 *  post:
 *    description: Use to create new post in web category
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

router.post("/create/web", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await web.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await web.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
})



  /**
 * @swagger
 * /xlarge/post/create/Competitiveprogramming:
 *  post:
 *    description: Use to create new post in Competitive programming category
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

router.post("/create/Competitiveprogramming", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await competitive.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await competitive.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
})




  /**
 * @swagger
 * /xlarge/post/create/Opensource:
 *  post:
 *    description: Use to create new post in Open source category
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

router.post("/create/Opensource", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await opensource.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await opensource.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
})



  /**
 * @swagger
 * /xlarge/post/create/Applicationdevelopment:
 *  post:
 *    description: Use to create new post in Application development category
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

router.post("/create/Applicationdevelopment", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await android.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await android.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
})




  /**
 * @swagger
 * /xlarge/post/create/Machinelearning:
 *  post:
 *    description: Use to create new post in Machine learning category
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

router.post("/create/Machinelearning", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await machine.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await machine.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
})







  /**
 * @swagger
 * /xlarge/post/create/Datascience:
 *  post:
 *    description: Use to create new post in Data science category
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

router.post("/create/Datascience", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await data.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await data.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
})






  /**
 * @swagger
 * /xlarge/post/create/Miscellaneousfields:
 *  post:
 *    description: Use to create new post in Miscellaneous fields category
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

router.post("/create/Miscellaneousfields", upload.single('img'), async (req, res) => {
  const { title, content, category, createdby } = req.body
  if(req.file){

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
   let postid=await testing.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });

  }
  else{



    const newPost = new post({
      _id: mongoose.Types.ObjectId(),
      title: title,
      content: content,
      category: category,
      createdby: createdby,
      
    })
  
    resultt = await newPost.save()
    let user1 = await user.findOne({ _id: createdby })
    user1.post.push(newPost._id)
   let postid=await testing.findOne({_id:category});
   postid.post.push(newPost._id)
    await postid.save((err,data)=>{
  console.log("saved")
    })
    fresult = await user1.save((err, data) => {
      res.json({ resultt})
    });



  }
  
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

router.post("/update/:id", upload.single('img'), async (req, res) => {

  const {  title, content, category,img } = req.body
  if(req.file){

    const resultt = await cloudinary.v2.uploader.upload(req.file.path)

    let result = await post.findOneAndUpdate({ _id: req.params.id }, { title: title, content: content, category: category,img:resultt.secure_url})
    res.json({ result})
  }

else{

  let result = await post.findOneAndUpdate({ _id: req.params.id }, { title: title, content: content, category: category})
  res.json({ result})


}
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

  /**
 * @swagger
 * /xlarge/post/list/:id:
 *  get:
 *    description: Use to retrieve a specific post with its id 
 *    responses:
 *      '200':
 *        description: A successful request with the data of the post send in json format
 *      '400':
 *        description: error in retrieving the post
 * 
 */

router.get("/list/:id", async (req, res) => {
  let result = await post.find({_id:req.params.id}, function(data,err){
 if(err){
   res.status(400).json(err)
 }
else{
  res.json(data)


}
  });


})

module.exports = router;