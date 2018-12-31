const mongoose=require('mongoose');

const schema={
    tournamentName:String,
    tournamentId:String,
    data:String,
    location:String,
    competitor:Array
};

const tournamentSchema=mongoose.Schema(schema);
const tournament=mongoose.model('Tournament',tournamentSchema,'tournaments');
module.exports=tournament;


