const express=require('express');
const { Authorizeuser } = require('../controllers/login');
const router=express.Router();

router.get("/",async (req,res)=>{
try{

    const auth_token= await req.headers.authorization;
    const logincredentials=Authorizeuser(token)
    if(logincredentials==false){
         res.status(200).send("Invalid token")
    }
    else{
        res.json(logincredentials)
    }
}
catch(e){
    console.log(e)
    res.status(400).send("server busy")
}


})


module.exports=router