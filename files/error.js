module.exports=(fn)=>(req,res,next)=>{
    try{
        fn(req,res,next);
    }
    catch(error){
        console.error(`some error happend: ${error}`);
    }
};