var mongoose = require('mongoose');

var joi = require("joi");
var post = mongoose.model("post", new mongoose.Schema({


  title:{
      type:String,
      required:true
  } ,
  createdat: {
    type: Date,
    default:Date.now()
  },
  content: {
    type: String,
    required:true
  },
  category:{
      type:String,
      required:true
  },
  createdby:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author'
    }  
 

 
}));
function validatepost(posts) {
    var Schema = {
   
        title: joi.string().required(),
        content: joi.string().min(8).max(255).required(),
        category: joi.string().required(),

   
   
   
    };
    return joi.validate(posts, Schema)
  }
  exports.validatepost =  validatepost;
  
  exports.post = post;


