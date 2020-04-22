const mongoose = require("mongoose")
var joi = require("joi");

var user = mongoose.model("user", new mongoose.Schema({

    name: {
        type: String,
        required: true,
        max: 25
    
      },
        email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    
      } ,
       password: {
        type: String,
        required: true,
        min: 8,
        max: 255
      },
      img: {
        type: String
      },
      phone: {
        type: String,
        min: 11,
        max: 14,
        required: true,
    
      },
      country: {
        type: String,
        required: true,
        maxlength: 50
      }

,Age:{
  type:String,
  required:true,
  max:2,
}



}));
function validateuser(useres) {
    var Schema = {
      name: joi.string().min(5).max(25).required(),
      img: joi.string(),
      email: joi.string().min(15).max(225).required(),
      password: joi.string().min(8).max(255).required(),
      phone: joi.string().min(11).max(14).required(),
      country: joi.string().max(15).required(),
   Age:joi.string().max(2).required()
   
    };
    return joi.validate(useres, Schema)
  }
  exports. validateuser =  validateuser;
  
  exports.user = user;
  