var mongoose = require('mongoose');

var joi = require("joi");
var opensource = mongoose.model("opensource", new mongoose.Schema({

    name:{
        type:String,
        unique: true
    } ,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }   ]
    



}))
function validateopensource(developers) {
    var Schema = {
   
       
        name: joi.string().max(15).required(),
        
   
   
   
    };
    return joi.validate(developers, Schema)
  }
  exports. validateopensource =   validateopensource;
  
exports.opensource=opensource;