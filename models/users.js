const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userschema = new Schema([{
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"author"
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"admin"
    },
}])

module.exports = mongoose.model("userschema", userschema)