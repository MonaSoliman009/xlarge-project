const mongoose = require("mongoose")
var joi = require("joi");
var author = mongoose.model("author", new mongoose.Schema({

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
      post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }   ]


}))
function validateauthor(autores) {
    var Schema = {
   
      email: joi.string().min(15).max(225).required(),
      password: joi.string().min(8).max(255).required(),
   
   
   
    };
    return joi.validate(autores, Schema)
  }
  exports.validateauthor =  validateauthor;
  
  exports.author = author;
