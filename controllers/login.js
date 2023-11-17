const User=require('../models/User');
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const client = require('../redis');
dotenv.config()


const checkuser=async(email)=>{
try {
    const user= await User.findOne({email:email});
    if(user){
        return true
    }
} catch (error) {
    return 'server busy'
}


}

async function AuthenticateUser(email ,password){
    try {
        const usercheck=await User.findOne({email:email});
        const validate=await bcrypt.compare(password,usercheck.password)
        if(validate){
            const token=jwt.sign({email},process.env.SECRETKEY_LOGIN)
            const response={
                id:usercheck._id,
                name:usercheck.name,
                email:usercheck.email,
                token:token,
                status:true
            }
            await client.set(`key-${email}`,Json.stringify(response))
            await User.findOneAndUpdate({email:usercheck.email},{$set:{token:token}})
            return response;
        }
        return "Invalid email or password"
    } catch (error) {
        console.log(error)
    }

}

async function Authorizeuser(token){
    try{

        const decodetoken=jwt.verify(token,process.env.SECRETKEY_LOGIN)
        if(decodetoken){
            const email=decodetoken.email;
            const auth=await client.get(`key-${email}`)
          if(auth){
            const data=Json.parse(auth);
            return data
          }else{
            const data=await User.findOne({email:email})
            return data
          }


        }
        return false
    }

    catch(e){
        console.log(e)
    }
}



module.exports={checkuser,AuthenticateUser,Authorizeuser};