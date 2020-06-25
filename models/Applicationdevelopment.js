var mongoose = require('mongoose');

var joi = require("joi");
var android = mongoose.model("android", new mongoose.Schema({

    name:{
        type:String,
        unique: true
    } ,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }   ]
    



}))
function validateandroid(developers) {
    var Schema = {
   
       
        name: joi.string().max(15).required(),
        
   
   
   
    };
    return joi.validate(developers, Schema)
  }
  exports.validateandroid =  validateandroid;
  
exports.android=android;