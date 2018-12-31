const Tournament=require('./schema');
const connection=require('./connect');
var db=connection;


module.exports={
                sendAllTournaments(req,res,next){
                connection.then(()=>{
                        const result= Tournament.find({},(err,result)=>{
                            if(err){
                                console.log(err);
                                res.status(404).send('not found');
                            }else{
                                res.json(result);
                            }
                        });
                }).catch((err)=>{
                        console.log(err);
                      
                });  
            
                
        },
        sendById(req,res,next){
            const tournamentId=req.query.tournamentId;
            connection.then(()=>{
                    Tournament.find({tournamentId},(err,result)=>{
                        if(err){
                                res.status(404).send('not found');
                        }else{
                                res.json(result);
                        }   
                    });
            }).catch((error)=>{
                        console.log(error);
                     
            });
    

        },
        AddNewPlayerToTournament(req,res,next){
                const tournamentId=req.body.tournamentId;
                if(typeof req.body.tournamentId=='undefined' || typeof req.body.id=='undefined' || typeof req.body.name=='undefined'){
                    res.send('you did not send all parameters ');
                }else{
                        connection.then(()=>{
                                Tournament.find({tournamentId},(err,result)=>{
                                        if(err){
                                                console.log(err);
                                                res.status(404).send('not found');               

                                        } else if(result.length==0){
                                                res.send('Tournament id not exist');
                                        }else{
                                                var array=result[0].competitor; 
                                                var flag=0;
                                                for(let i=0;i<array.length;i++){
                                                        if(array[i].id==req.body.id)
                                                                flag=1;
                                                }
                                                if(flag==1){
                                                        console.log('id allready exist');
                                                        res.send('id allready exist');
                                                }
                                                else{
                                                        var player={id:req.body.id,name:req.body.name};
                                                        array.push(player);
                                                        const conditions={tournamentId:req.body.tournamentId};
                                                        const options={};
                                                        const doc={
                                                                $push:{competitor:player}
                                                        };
                                                       
                                                        Tournament.updateOne(conditions,doc,options,(err,resultIn)=>{
                                                                if(err){
                                                                        console.log(`error ${err}`);
                                                                        res.status(404).send('not found');       
                                                                }else{
                                                                        console.log(resultIn); 
                                                                        res.send('you add player to the tournament');          
                                                                }       
                                                        });
                                                }
                                        }       
                                });
                                
                        }).catch((error)=>{
                                console.log(error);
                        });
                }
             
              
        },
        findBetweendates(req,res,next){
                connection.then(()=>{
                        console.log('connected');
                        const StartDate=req.query.StartDate;
                        const EndDate=req.query.EndDate;
                    
                        if(typeof StartDate=='undefined' || typeof EndDate=='undefined'){
                                console.log('did not enter dates');
                                res.send('did not enter dates');
                        }else{
                                var startDay=StartDate[1]+StartDate[2];
                                var startMonth=StartDate[4]+StartDate[5];
                                var startYear=StartDate[7]+StartDate[8]+StartDate[9]+StartDate[10];
                                var endDay=EndDate[1]+EndDate[2];
                                var endMonth=EndDate[4]+EndDate[5];
                                var endYear=EndDate[7]+EndDate[8]+EndDate[9]+EndDate[10];

                                startDay=parseInt(startDay);
                                startMonth=parseInt(startMonth);
                                startYear=parseInt(startYear);
                                endDay=parseInt(endDay);
                                endMonth=parseInt(endMonth);
                                endYear=parseInt(endYear);

                                var flag=0

                                if( endYear<startYear )
                                        flag=1;
                        
                                if( (endYear>=startYear) && ( endMonth<startMonth  ) )
                                        flag=1;

                                if( (endYear>=startYear) && ( endMonth>=startMonth  )  && (endDay<startDay))
                                         flag=1;
                               
                                if(flag==1){
                                        console.log('You enter invalid dates');
                                        res.send('You enter invalid dates');
                                }else{
                                        Tournament.find({},(err,result)=>{
                                                if(err){
                                                        console.log(err);
                                                        res.status(404).send('not found');
                
                                                }else{
                                                        
                                                       var resultArray=[];

                                                        for(let i=0;i<result.length;i++){
                                                               
                                                                var Day=result[i].data[0]+result[i].data[1];
                                                                var Month=result[i].data[3]+result[i].data[4];
                                                                var Year=result[i].data[6]+result[i].data[7]+result[i].data[8]+result[i].data[9];


                                                                Day=parseInt(Day);
                                                                Month=parseInt(Month);
                                                                Year=parseInt(Year);

                                                             
                                                                if( (Year>=startYear) && ( Month>=startMonth) && (Year>-startYear) && (Year<=endYear) && (Month<=endMonth) && (Day<=endDay) )
                                                                        resultArray.push(result[i]);
                                                        }
                                                        res.json(resultArray);
                                                }
                                        });
                                }
                        }
                }).catch((error)=>{
                        console.log(error);
                      
                });
              
        }
}