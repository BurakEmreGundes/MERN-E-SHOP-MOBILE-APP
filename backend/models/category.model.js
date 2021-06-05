const mongoose=require("mongoose");


const categorySchema=new mongoose.Schema({
    name:{ type:String,required:true},
    icon:{type:String},
    color:{type:String}
},{collection:"Category",timestamps:true})

const Category=new mongoose.model("Category",categorySchema)



module.exports=Category