var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var joi = require("joi")
var config = require("config")

const nodemailer = require('nodemailer');

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {
  
    user
  } = require("../models/user");
  var {
    author
  } = require("../models/author");
  var {admin} = require("../models/admin")


router.post('/', parseUrlencoded, async (req, res) => {

    var {
        error
      } = validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      let users = await user.findOne({
        email: req.body.email
      });
     if(!users){

        let authors = await author.findOne({
            email: req.body.email
          });
         if(authors){
            var validepassword = await bcrypt.compare(req.body.password, authors.password);
            if(!validepassword){
                return res.status(400).send("invalid email or password.");

            }
            else{

                var token = jwt.sign({
                    _id: authors._id
                  }, config.get('jwtprivatekey'))
                  res.cookie('jwt', token, {
                    httpOnly: true
                  })
                  res.header("x_auth_token_author", token).status(200).json({
                    "token": token,
                    "author": authors._id,
                    "name": "author"
                  });
            }

        }
else{


    let admins = await admin.findOne({
        email: req.body.email
      });
     if(admins){
        var validepassword = await bcrypt.compare(req.body.password, admins.password);
        if(!validepassword){
            return res.status(400).send("invalid email or password.");

        }
        else{

            var token = jwt.sign({
                _id: admins._id
              }, config.get('jwtprivatekey'))
              res.cookie('jwt', token, {
                httpOnly: true
              })
              res.header("x_auth_token_admin", token).status(200).json({
                "token": token,
                "author": admins._id,
                "name": "admin"
              });
        
    }



    

     }
    
    
    }


     }






     else{

        validepassword = await bcrypt.compare(req.body.password, users.password);
        if (!validepassword) {
          return res.status(400).send("invalid email or password.");
    
        }
         else {
          var token = jwt.sign({
            _id: users._id
          }, config.get('jwtprivatekey'))
          res.cookie('jwt', token, {
            httpOnly: true
          })
          res.header("x_auth_token_user", token).status(200).json({
            "token": token,
            "user": users._id,
            "name": "user"
          });
        }


     }







})



function validate(req) {
  var schema = {
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required()
  };
  return joi.validate(req, schema)
}




router.post("/forget/password", parseUrlencoded,async(req,res)=>{
  
    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: "savethemiti@gmail.com",
          pass: "123456789@@"
      }
  });
  
  
  
    let users = await user.findOne({
      email: req.body.email
    });
  
    if (!users) {
      let authors = await author.findOne({
        email: req.body.email
      });
      if (authors) {
        var token = jwt.sign({
          _id: authors._id
        }, config.get('jwtprivatekey'))
        var mailOptions={
          from :"savethemiti@gmail.com" ,
          to:req.body.email,
          subject : 'This email is from x large website',
          html:`
          <h1 style="text-align:center;margin-bottom:20px">Reset your password?</h1>
          <h4 style="text-align:center;margin-bottom:20px">If you requested a password reset for ${req.body.email}, click the button below.</br> 
          If you didn't make this request, ignore this email.</h4>
          <button style="background-color:#3B6D8C;margin-left:50%;border-style:none;padding:5px"><a style="text-decoration:none;background-color:#3B6D8C;color:white" href="http://localhost:4200/reset-password">Reset Password</a></button>
        <p style="text-align:center">This email was meant for ${req.body.email}</p>
        
          `
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
            res.json(error);
          }
          else{
            res.json(token);
             }
  
            })
  
      } else {
        let admins = await admin.findOne({
          email: req.body.email
        });
        if (admins) {
          var token = jwt.sign({
            _id: admins._id
          }, config.get('jwtprivatekey'))
         mailOptions={
            from :"savethemiti@gmail.com" ,
            to:req.body.email,
            subject : 'This email is from x large website',
            html:`
            <h1 style="text-align:center;margin-bottom:20px">Reset your password?</h1>
            <h4 style="text-align:center;margin-bottom:20px">If you requested a password reset for ${req.body.email}, click the button below. </br>
            If you didn't make this request, ignore this email.</h4>
            <button style="background-color:#3B6D8C;margin-left:50%;border-style:none;padding:5px"><a style="text-decoration:none;background-color:#3B6D8C;color:white" href="http://localhost:4200/reset-password">Reset Password</a></button>
          <p style="text-align:center">This email was meant for ${req.body.email}</p>
          
            `
          }
          smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
              res.json(error);
            }
            else{
              res.json(token);
               }
    
              })
  
        } else {
          return res.status(400).send("invalid email or password.");
  
        }
      }
  
    } else {
       token = jwt.sign({
        _id: users._id
      }, config.get('jwtprivatekey'))
     mailOptions={
        from :"savethemiti@gmail.com" ,
        to:req.body.email,
        subject : 'This email is from x large website',
        html:`
        <h1 style="text-align:center;margin-bottom:20px">Reset your password?</h1>
        <h4 style="text-align:center;margin-bottom:20px">If you requested a password reset for ${req.body.email}, click the button below. </br>
        If you didn't make this request, ignore this email.</h4>
        <button style="background-color:#3B6D8C;margin-left:50%;border-style:none;padding:5px"><a style="text-decoration:none;background-color:#3B6D8C;color:white" href="http://localhost:4200/reset-password">Reset Password</a></button>
      <p style="text-align:center">This email was meant for ${req.body.email}</p>
      
        `
      }
  
      smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          res.json(error);
        }
        else{
          res.json( token);
           }
  
          })
    }
  
  
  
  
  });





  router.post("/reset/password",parseUrlencoded,async(req,res)=>{


    let users = await user.findOne({
      email: req.body.email
    });
  
    if (!users) {
      let authors = await author.findOne({
        email: req.body.email
      });
      if (authors) {
        var salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  
    author.update({email:req.body.email},{password:req.body.password},function(err,data){
      if(err){
      }
      res.send(data)
  })
    
      } else {
        let admins = await admin.findOne({
          email: req.body.email
        });
        if (admins) {
          var salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        
          admin.update({email:req.body.email},{password:req.body.password},function(err,data){
            if(err){
            }
            res.send(data)
        })
  
        } 
      }
  
    } else {
    
      var salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    
      user.update({email:req.body.email},{password:req.body.password},function(err,data){
        if(err){
        }
        res.send(data)
    })
    }

  })
  








module.exports = router;
