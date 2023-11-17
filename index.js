const express=require('express');
const connectDB=require('./Connection.js');
const cors=require('cors')
var signinRouter=require('./routes/signin.js')
var loginRouter=require('./routes/login.js')
var homeRouter=require('./routes/home.js')

const app=express();
const Port=4000;
connectDB();

app.use(express.json());
app.use(cors())


app.use('/signin',signinRouter);
app.use('/login',loginRouter);
app.use('/home',homeRouter)
app.get('/',(req,res)=>{
    console.log("hello");

})

app.listen(Port,(req,res)=>{
    console.log("server running on ",Port)
} )