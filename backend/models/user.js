const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

// create user schema
const userSchema = mongoose.Schema({
    firstName: String, 
    lastName: String, 
    email: String,
    pwd: String, 
    role : String,
    avatar : String,
});

// Appliquez le plugin unique-validator au schéma
// userSchema.plugin(uniqueValidator);

// create User model
const user = mongoose.model("User",userSchema); 
// exporte model
module.exports = user;