const mongoose=require('mongoose');

const verifyschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
},
{
    collection:"verifyuser"
})

module.exports=mongoose.model("verifyuser",verifyschema);