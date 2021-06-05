const router=require("express").Router();
const Product = require("../models/product.model");


router.get("/",async (req,res)=>{  
    try {
        const products=await Product.find({})
        if(products.length<=0){
            res.status(404).send({
                err:{message:"Users not found",status:404}
            })
        }else{
            res.status(200).send({
                data:products,
                status:200
            })
        }
    } catch (error) {
        res.status(500).send({
            err:error,
            status:500
        })
    }
    

   
})

router.post("/",async (req,res)=>{
    try {
        const product=new Product(req.body)
        await product.save()
        res.status(201).send({
            data:product,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error:error,
    })
    }
})




module.exports=router