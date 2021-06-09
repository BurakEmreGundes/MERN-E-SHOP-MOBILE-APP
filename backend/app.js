const express=require("express");
const app=express();
const cors=require("cors");
const morgan=require("morgan");

require("dotenv/config")
require("./config/db-connection")

const apiUrl=process.env.API_URL

// routers
const productRouter=require("./routers/productRouter")
const categoryRouter=require("./routers/categoryRouter")
const userRouter=require("./routers/userRouter")
const orderRouter=require("./routers/orderRouter")
const errorHandler=require("./helpers/errorHandler")
const authJwt=require("./middlewares/authJwt")

app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan("tiny"))


app.use(authJwt())

app.get("/",(req,res)=>{ 
    res.send("WELCOME THIS SERVICE!")
})

app.use(`${apiUrl}/product`,productRouter)
app.use(`${apiUrl}/category`,categoryRouter)
app.use(`${apiUrl}/user`,userRouter)
app.use(`${apiUrl}/order`,orderRouter)

app.use(errorHandler)

app.listen(3000,_=>{ console.log("Server listening 3000 port!") })





