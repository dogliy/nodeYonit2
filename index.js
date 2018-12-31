
const express=require('express');
const port=process.env.PORT || 5000;
const app=express();
const functions=require('./files/functions');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/',(req,res,next)=>{
    functions.sendAllTournaments(req,res,next);
   
});
app.get('/tournament/:tournamentId',(req,res,next)=>{
    functions.sendById(req,res,next);
    
});
app.post('/AddNewPlayerToTournament',(req,res,next)=>{
    functions.AddNewPlayerToTournament(req,res,next);
   
});
app.get('/findBetweendates',(req,res,next)=>{
    functions.findBetweendates(req,res,next);
    
});
app.all('*',(req,res)=>{
    res.send('cannot find routh try again');
});

app.listen(port);
