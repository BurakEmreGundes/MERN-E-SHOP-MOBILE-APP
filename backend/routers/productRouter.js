const router=require("express").Router();
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const mongoose=require("mongoose")

router.get("/",async (req,res)=>{  
    try {

        let filter={}
        if(req.query.categories){
            filter={category:req.query.categories.split(",")}
        }

        const products=await Product.find(filter).populate("category").exec()
        if(products.length<=0){
            res.status(404).send({
                error:{message:"Users not found"},
                status:404,
                success:false
            })
        }else{
            res.status(200).send({
                data:products,
                status:200,
                success:true
            })
        }
    } catch (error) {
        res.status(500).send({
            error:error,
            status:500
        })
    }
    

   
})

router.get("/:id",async (req,res)=>{  
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send({
                error:{message:"Product id is not true"},
                status:400,
                success:false
            })
        }
        const product=await Product.findOne({_id:req.params.id}).populate("category").exec()
        if(!product){
            res.status(404).send({
                error:{message:"Product not found"},
                status:404,
                success:false
            })
        }else{
            res.status(200).send({
                data:product,
                status:200,
                success:true
            })
        }
    } catch (error) {
        res.status(500).send({
            error:error,
            status:500
        })
    }
    

   
})

router.post("/",async (req,res)=>{
    try {
        const category=await Category.findOne({_id:req.body.category})
        if(!category){
            res.status(400).send({
                status:400,
                error:{message:"Category not found"},
                success:false
            })
        }
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

router.put('/:id',async (req,res)=>{
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send({
                error:{message:"Product id is not true"},
                status:400,
                success:false
            })
        }
        const category=await Category.findOne({_id:req.body.category})
        if(!category){
            res.status(400).send({
                status:400,
                error:{message:"Category not found"},
                success:false
            })
        }
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!product){
            res.status(404).send({
                error:{message:"Product not found"},
                status:404,
                success:false
            })
        }else{
            res.status(200).send({
                data:product,
                status:200,
                success:true
            })

        }
    } catch (error) {
        res.status(500).send({
            error:error,
            status:500,
            success:false
        })
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send({
                error:{message:"Product id is not true"},
                status:400,
                success:false
            })
        }
      const product= await Product.findByIdAndRemove(req.params.id)
      if(!category){
        res.status(404).send({
            error:{message:"Product not found"},
            status:404,
            success:false
        })
      }else{
          res.status(200).send({
              data:product,
              status:200,
              success:true
          })
      }

    } catch (error) {
        res.status(500).send({
            error:error,
            status:500,
            success:false
        })
        
    }
})

router.get('/get/count',async (req,res)=>{
    const productCount=await Product.countDocuments((count)=>count)
    
    if(!productCount){
        res.status(500).send({
            error:{message:"Product Count not found"},
        })
    }
    res.status(200).send({
        productCount:productCount,
        status:200,
        success:true
    })


})
router.get('/get/featured/:count',async (req,res)=>{
    try {
        const count=req.params.count
        const products=await Product.find({isFeatured:true}).limit(count)
        if(products.length<=0){
            res.status(404).send({
                error:{message:"Users not found"},
                status:404,
                success:false
            })
        }else{
            res.status(200).send({
                data:products,
                status:200,
                success:true
            })
        }
    } catch (error) {
        res.status(500).send({
            error:error,
            status:500
        })
    }
    



})






module.exports=router