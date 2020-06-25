var mongoose = require('mongoose');

var joi = require("joi");
var data = mongoose.model("data", new mongoose.Schema({

    name:{
        type:String,
        unique: true
    } ,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }   ]
    



}))
function validatedata(developers) {
    var Schema = {
   
       
        name: joi.string().max(15).required(),
        
   
   
   
    };
    return joi.validate(developers, Schema)
  }
  exports.validatedata =  validatedata;
  
exports.data=data;