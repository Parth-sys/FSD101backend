const User = require('../models/User');
const sendMail = require('./sendMail')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const VerifyUser = require('../models/VerifyUser');
dotenv.config();


async function InsertverifyUser(name, email, password) {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const token = genrateToken(email);

        const newuser = new VerifyUser({
            name: name,
            email: email,
            password: hashPassword,
            token: token
        })




        const activationLink = `http://localhost:4000/signin/${token}`;

        const content = `
         <h4>hi there,</h4>
            <h5>Welcome</h5>
             <p>  Thank you for signin please click below link for activation</p>
              <a  href="${activationLink}"> Click here</a>
                <p>Thank you</p> 
                 ` 
        await newuser.save();

        sendMail(email, "Verifyuser", content)
    }
    catch (error) {

    }

}


function genrateToken(email) {

    const token = jwt.sign(email, process.env.SECRETKEY_SIGNUP)
    return token
}

async function InsertSigupUser(token){

    try{

        
        const userVerify=await VerifyUser.findOne({token:token})
        if(userVerify){
            
            const newUser=new User({
                name:userVerify.name,
                email:userVerify.email,
                password:userVerify.password,
                forgetpassword:{}
            })
            await newUser.save();
            await userVerify.deleteOne({token:token})
            const content = `
            <h4>hi there,</h4>
            <h5>Welcome</h5>
            <p> You are successfully registerd</p>
            <p>Thank you</p>    `
            
            sendMail.sendmail(newUser.email,"Registration Success",content)  
            
            return `<html>
            <body>
            <h4>hi there,</h4>
            <h5>Welcome</h5>
            <p> You are successfully registerd</p>
            <p>Thank you</p> 
            </body> 
            <html>  `;
        }
    }
     catch(error){
            console.log(error)

         return `
          <html>
          <body>
         <h4>Registration failed</h4>
          <p>Thank you</p>
             </body>    
         </html>`;
        }    
    }


module.exports={InsertverifyUser,InsertSigupUser}