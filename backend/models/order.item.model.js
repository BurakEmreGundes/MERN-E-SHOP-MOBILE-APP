const mongoose=require("mongoose");


const orderItemSchema=new mongoose.Schema({ 
    quantity:{ 
        type:Number, 
        required:true,
        
    },
    product:{ 
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product",
    }

},{collection:"OrderItem",timestamps:true})


const OrderItem=new mongoose.model("OrderItem",orderItemSchema)

module.exports = OrderItem


