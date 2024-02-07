const mongoose = require("mongoose");
// create match schema
const matchSchema = mongoose.Schema({
    scoreOne : Number,
    scoreTwo : Number,
    teamOne : String,
    teamTwo : String,
});
// create Match model
const match = mongoose.model("Match", matchSchema);

// exporte model
module.exports = match;