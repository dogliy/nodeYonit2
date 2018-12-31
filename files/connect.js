const consts=require('./consts');
const mongoose=require('mongoose');

const {MLAB_URL,DB_USER,DB_PASS}=consts;
const url=MLAB_URL;

const options={
    useNewUrlParser:true,
    useCreateIndex:true,
    user:DB_USER,
    pass:DB_PASS
}

module.exports=mongoose.connect(url,options);