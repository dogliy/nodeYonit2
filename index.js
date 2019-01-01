
const express=require('express');
const port=process.env.PORT || 5000;
const app=express();
const functions=require('./files/functions');
const error=require('./files/error');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/aaa',error("dani"));

app.get('/',error(functions.sendAllTournaments));

app.get('/tournament/:tournamentId',error(functions.getTournamentById));

app.post('/AddNewPlayerToTournament',error( functions.AddNewPlayerToTournament));

app.get('/findBetweendates',error(functions.findBetweendates));

app.post('/addTournament',error(functions.addTournament));

app.all('*',(req,res)=>{
    res.send('cannot find routh try again');
});

app.listen(port);
