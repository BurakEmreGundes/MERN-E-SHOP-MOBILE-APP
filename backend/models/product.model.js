const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:{ type:String, required:true},
    description:{ type:String, required:true},
    richDescription:{ type:String, default:''},
    image:{ type:String,default:''},
    images:{type:[String],default:[]},
    countInStock:{ 
        type:Number,
        required:true,
        min:0,
        max:255
    },
    brand:{ type:String, default:''},
    price:{ type:Number, default:0},
    category:{ type:mongoose.SchemaTypes.ObjectId,
    ref:'Category'},
    rating:{ type:Number, default:0},
    numReview:{ type:Number, default:0},
    isFeatured:{ type:Boolean, default:false}

},{collection:"Product",timestamps:true})


const Product=new mongoose.model("Product",productSchema)

module.exports=Product
