const express=require("express")
const {connection}=require("./src/dbConfig/dbConnection")
const router=require("./src/routes/logRoutes")
const userRoutes = require('./src/routes/userRoutes');

require("dotenv").config()
const PORT=process.env.PORT || 3000;

const app=express()
app.use(express.json())

app.use("/logs",router)
app.use('/users', userRoutes);

app.get("/",async(req,res)=>{
    try{
        res.send({message:"HOME PAGE"})
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){       
        console.log(err)
        console.log("not connected to db")
    }
   console.log(`server is running at ${PORT}`)
})