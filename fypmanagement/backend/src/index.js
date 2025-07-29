const express=require("express");
const dotenv=require("dotenv").config();
const authroutes=require("./routes/authroutes.js")
const dbconnect=require("./config/dbconnect.js");
const userroutes=require("./routes/userroutes");
dbconnect();
const app=express();




const cors = require("cors");
app.use(cors({ origin: "https://management-henna-nine.vercel.app", credentials: true }));

//Midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes

app.use("/api/auth",authroutes);
app.use("/api/user",userroutes);
//Starting the server
const PORT=process.env.PORT || 8001;

app.listen(PORT,()=>{
    console.log(`Server running at port no. ${PORT}`);
})