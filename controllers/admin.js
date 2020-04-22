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
     
    });
  
    var salt = await bcrypt.genSalt(10);
    authorr.password = await bcrypt.hash(authorr.password, salt);
    await authorr.save();
  
    
    res.status(200).json({
        authorr
    });



  })
  module.exports = router;
