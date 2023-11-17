const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();



const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.mongoDB_URL);
        console.log("connected");
        
    } catch (error) {
        console.log(error)
    }

}

module.exports=connectDB