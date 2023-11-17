const redis =require('redis');
const dotenv=require('dotenv');

dotenv.config()

const redisclient=()=>{
    return redis.createClient()
}

const client=redisclient();
client.on("error",(err)=>{
    console.log(err)

})

client.on("connect",()=>{
    console.log("connected")

})

client.on("end",()=>{
    console.log("connected ended")

})
client.on("SIGQUIT",()=>{
    client.quit()

})

module.exports=client