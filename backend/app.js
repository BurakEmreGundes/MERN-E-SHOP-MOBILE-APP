const express=require("express");
const app=express();
const cors=require("cors");
const morgan=require("morgan");

require("dotenv/config")
require("./config/db-connection")

const apiUrl=process.env.API_URL

// routers
const productRouter=require("./routers/productRouter")



app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan("tiny"))



app.get("/",(req,res)=>{ 
    res.send("WELCOME THIS SERVICE!")
})
app.use(`${apiUrl}/product`,productRouter)

app.listen(3000,_=>{ console.log("Server listening 3000 port!") })





