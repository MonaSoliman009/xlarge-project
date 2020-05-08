var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("config");
const multer = require("multer");
const path = require("path");
var bcrypt = require("bcryptjs");
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

  router.post("/signup",  parseUrlencoded, async (req, res, next) => {
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
  
    userr = new user({
        name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      Age: req.body.Age,
      phone: req.body.phone,
      country: req.body.country,
      img: req.body.img,
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
*  author:
*    type: "object"
*    required:
*    - "name"
*    - "email"
*    - "password"
*    properties:
*      name:
*        type: "string"
*      email:
*        type: "string"
*      password:
*        type: "string"
*      post:
*        type: "array"
*    xml:
*      name: "author"
*  post:
*    type: "object"
*    required:
*    - "content"
*    - "category"
*    - "title"
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
*    xml:
*      name: "post"
*/







  module.exports = router;
