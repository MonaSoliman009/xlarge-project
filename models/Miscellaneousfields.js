var mongoose = require('mongoose');

var joi = require("joi");
var testing = mongoose.model("testing", new mongoose.Schema({

    name:{
        type:String,
        unique: true
    } ,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }   ]
    



}))
function validatetesting(developers) {
    var Schema = {
   
       
        name: joi.string().max(15).required(),
        
   
   
   
    };
    return joi.validate(developers, Schema)
  }
  exports.validatetesting =  validatetesting;
  
exports.testing=testing;