var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("config");
var bcrypt = require("bcryptjs");
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
var {
    validateuser,
    user
  } = require("../models/user");
 

  /**
 * @swagger
 * /xlarge/user/signup:
 *  post:
 *    description: Use to sign up the users
 *    parameters:
 *    -  in: body
 *       name: body
 *       description: "create new user"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/user"
 *    responses:
 *      '400':
 *        description: something went wrong || user already registered
 *      '200':
 *        description: A successful request with the data of this new user send in json format
 * 
 */

  router.post("/signup",  upload.single('img'), async (req, res, next) => {
    var {
      error
    } = validateuser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let userr = await user.findOne({
      email: req.body.email
    });
    if (userr) {
      return res.status(400).send("user already registered.");
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path)

    userr = new user({
        name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      Age: req.body.Age,
      phone: req.body.phone,
      country: req.body.country,
      img: result.secure_url
    });
  
    var salt = await bcrypt.genSalt(10);
    userr.password = await bcrypt.hash(userr.password, salt);
    await userr.save();
  
    
    res.status(200).json({
        userr
    });
  });

/**
 * @swagger
 * /xlarge/user/account/:id:
 *  get:
 *    description: Use to find an user account with his ID (using after login)
 *    parameters:
 *    -  name: user id sent in the url
 *       in: path
 *       description: "user id send in the url"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *    responses:
 *      '200':
 *        description: A successful request with the data of user send in json format
 */
  router.get("/account/:id", async (req, res) => {

    let user_account = await user.findOne({
      _id: req.params.id
    });
  
    res.json(user_account)
  });
  


/**   
* @swagger
*definitions:
*  user:
*    type: "object"
*    required:
*    - "name"
*    - "email"
*    - "password"
*    - "phone"
*    - "country"
*    - "Age"
*    properties:
*      name:
*        type: "String"
*      email:
*        type: "string"
*      password:
*        type: "string"
*      img:
*        type: "string"
*      phone:
*        type: "string"
*      country:
*        type: "string"
*      Age:
*        type: "string"
*    xml:
*      name: "user"
*  admin:
*    type: "object"
*    required:
*    - "email"
*    - "password"
*    properties:
*      email:
*        type: "string"
*      password:
*        type: "string"
*    xml:
*      name: "admin"
*  post:
*    type: "object"
*    required:
*    - "content"
*    - "category"
*    - "title"
*    - "img"
*    properties:
*      title:
*        type: "string"
*      createdat:
*        type: "Date"
*      content:
*        type: "string"
*      category:
*        type: "string"
*      createdby:
*        type: "object"
*      img:
*        type:"string"
*    xml:
*      name: "post"
*  categories:
*    type: "object"
*    required:
*    - "name"
*    - "posts"
*    properties:
*      name:
*        type: "string"
*      post:
*        type: "array"
*    xml:
*      name: "categories"
*/







  module.exports = router;
