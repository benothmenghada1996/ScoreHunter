//import mongoose module
const mongoose= require("mongoose");

//create stadium scemha
const stadiumSchema= mongoose.Schema({
    name:String,
    capacity:Number,
    country:String
});
//affect model name to schema
const stadium=mongoose.model("Stadium",stadiumSchema);
//export stadium
module.exports=stadium;