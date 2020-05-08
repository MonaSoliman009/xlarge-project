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
  validateadmin,
  admin
} = require("../models/admin");
var {
  validateuser,
  user
} = require("../models/user");

  /**
 * @swagger
 * /xlarge/admin/delete/user/:id:
 *  delete:
 *    description: Use to delete post
 *    responses:
 *      '200':
 *        description: user is deleted successfully
 * 
 */



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



  /**
 * @swagger
 * /xlarge/admin/add/admin:
 *  post:
 *    description: Use to Add new Admin
 *    parameters:
 *    -  in: body
 *       name: body
 *       description: "Add new Admin"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/admin"
 *    responses:
 *      '200':
 *        description: A successful request with the data of this new Admin send in json format
 * 
 */


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

  /**
 * @swagger
 * /xlarge/admin/account/:id:
 *  get:
 *    description: Use to find Admin Account 
 *    responses:
 *      '200':
 *        description: A successful request with the data of  Admin send in json format
 * 
 */

router.get("/account/:id", async (req, res) => {

  let adminspec = await admin.findOne({
    _id: req.params.id
  });

  res.json(adminspec)
});




  /**
 * @swagger
 * /xlarge/admin/user/list:
 *  get:
 *    description: Use to retrieve All Users  
 *    responses:
 *      '200':
 *        description: A successful request with the data of all users send in json format
 * 
 */


router.get("/user/list", async (req, res) => {
  let result = await user.find({});
  res.json(result)





})
module.exports = router;
