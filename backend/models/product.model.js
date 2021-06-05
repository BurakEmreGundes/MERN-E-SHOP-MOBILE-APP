const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:String,
    image:String,
    countInStock:{ 
        type:Number,
        required:true
    }
})


const Product=new mongoose.model("Product",productSchema)

module.exports=Product
