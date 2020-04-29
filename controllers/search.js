var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();


var jwt = require("jsonwebtoken");
var config = require("config");
const multer = require("multer");
const path = require("path");
var bcrypt = require("bcryptjs");
var {
  
  post
  } = require("../models/post");
  var {
    
    author
    } = require("../models/author")


/**
 * @swagger
 * /xlarge/search/category/{category name}:
 *  get:
 *    description: Use to find a specific category posts
 *    parameters:
 *    -  name: name of category
 *       in: path
 *       description: "category name send in the url"
 *       required: true
 *       type: "string"
 *    responses:
 *      '400':
 *        description: category not found
 *      '200':
 *        description: A successful request with the data of category posts send in json format
 */


    
  router.get("/category/:categorey",async(req,resp)=>{
    var name=req.params.categorey;
     
    post.find({"category": {"$regex": name}},function(err,data){
     if(data.length!=0)
   
     resp.status(200).json(data);
     else
     resp.status(400).send("Not found");
   
    })


  });


/**
 * @swagger
 * /xlarge/search/category/{author name}:
 *  get:
 *    description: Use to find posts to a specific author posts
 *    parameters:
 *    -  name: name of author
 *       in: path
 *       description: "author name send in the url"
 *       required: true
 *       type: "string"
 *    responses:
 *      '400':
 *        description: author not found
 *      '200':
 *        description: A successful request with the data of posts send in json format
 */


  router.get("/name/:name",async(req,resp)=>{
    var name=req.params.name;
     
 await   author.find({"name": {"$regex": name}},function(err,data){
     if(data.length!=0){
console.log(data[0]._id)
post.find({"createdby":data[0]._id},function(err,data){



  resp.json(data);

})





     }
   
     else{

      resp.send("Not found");

     }
   
    })


  })
  




  module.exports=router