var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
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
  router.get("/category/:categorey",async(req,resp)=>{
    var name=req.params.categorey;
     
    post.find({"category": {"$regex": name}},function(err,data){
     if(data.length!=0)
   
     resp.json(data);
     else
     resp.send("Not found");
   
    })


  });
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