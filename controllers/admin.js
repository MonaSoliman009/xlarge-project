var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
var bcrypt = require("bcryptjs");
var {
    validateauthor,
    author
  } = require("../models/author");
  var {
    validateadmin,
    admin
  } = require("../models/admin");
  var {
    validateuser,
    user
  } = require("../models/user");
  
  router.post("/add/author", parseUrlencoded, async (req, res, next) => {

    var {
        error
      } = validateauthor(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      let authorr = await author.findOne({
        email: req.body.email
      });
      if (authorr) {
        return res.status(400).send("author already registered.");
      }

      authorr = new author({
     
      email: req.body.email,
      password: req.body.password,
      name:req.body.name
     
    });
  
    var salt = await bcrypt.genSalt(10);
    authorr.password = await bcrypt.hash(authorr.password, salt);
    await authorr.save();
  
    
    res.status(200).json({
        authorr
    });



  })

  router.delete("/delete/user/:id", function (req, resp) {

    mongoose.model("user").findOneAndRemove({
        _id: req.params.id
      },
      function (err, data) {
        if (!err) {
        }
      })
  
    resp.json("user deleted")
  })
  
  router.delete("/delete/author/:id", function (req, resp) {

    mongoose.model("author").findOneAndRemove({
        _id: req.params.id
      },
      function (err, data) {
        if (!err) {
        }
      })
  
    resp.json("author deleted")
  })



  router.post("/add/admin", parseUrlencoded, async (req, res) => {
    var {
      error
    } = validateadmin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    let new_admin = new admin({
      password: req.body.password,
      email: req.body.email,
  
    });
    var salt = await bcrypt.genSalt(5);
    new_admin.password = await bcrypt.hash(new_admin.password, salt);
    await new_admin.save();
    res.json(new_admin);
  });
  

  router.get("/account/:id", async (req, res) => {

    let adminspec = await admin.findOne({
      _id: req.params.id
    });
  
    res.json(adminspec)
  });
  
  router.get("/author/list",async(req,res)=>{
    let result = await   author.find({});
  res.json(result)
  
  
  })
  router.get("/user/list",async(req,res)=>{
    let result = await   user.find({});
  res.json(result)
  
  
  
  
  
  })
  module.exports = router;
