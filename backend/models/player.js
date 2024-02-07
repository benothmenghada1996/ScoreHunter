const mongoose = require ("mongoose");
// create player schema
const playerSchema = mongoose.Schema({
    name : String,
    age : Number,
    number : Number,
    position : String,
    teamId: 
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'},
});
// create Player model
const player = mongoose.model("Player",playerSchema);
// exporte model
module.exports = player;