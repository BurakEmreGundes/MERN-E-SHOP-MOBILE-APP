const mongoose=require("mongoose");


const orderSchema=new mongoose.Schema({
    orderItems:[{ 
        type:mongoose.SchemaTypes.ObjectId,
        ref:"OrderItem",
        required:true
    }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String,
        required:true
    },
    city:{
         type:String,
        required:true
    },
    zip:{
        type:String,
       required:true
   },
   country:{
    type:String,
   required:true
},
   phone:{
    type:String,
   required:true
},
status:{ 
    type:String,
    required:true,
    default:'Pending'   
},
totalPrice:{ 
    type:Number
},
user:{ 
    type:mongoose.SchemaTypes.ObjectId, required:true,
    ref:"User"
},
dateOrdered:{ type:Date, default:Date.now()}
    


},{collection:"Order",timestamps:true})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

orderSchema.set('toJSON',{virtuals:true})

const Order=new mongoose.model("Order",orderSchema)

module.exports = Order