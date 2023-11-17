const nodemailer=require('nodemailer');
const dotenv=require('dotenv')

dotenv.config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

function sendmail(toEmail,subject,content){
   const mailOption={
    from:process.env.EMAIL,
    to:toEmail,
    subject:subject,
    html:content
   }


   transporter.sendMail(mailOption,(error,info)=>{
     if(error){
        console.log(error)
     }
     else{
        console.log("email sent",info.response)
     }
   }

   )
}

module.exports={sendmail}
