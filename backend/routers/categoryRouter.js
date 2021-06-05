const Category=require("../models/category.model")
const router=require("express").Router()



router.get("/",async (req,res)=>{
    try {
        const categories=await Category.find({})
        if(categories.length<0){
            res.status(404).send({
                success:false,
                error:{message:"Categories not found!"},
                status:404
            })
        }else{
            res.status(200).send({
                data:categories,
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
        const category=await Category.findOne({_id:req.params.id})
        if(!category){
            res.status(404).send({
                success:false,
                error:{message:"Category not found!"},
                status:404
            })
        }else{
            res.status(200).send({
                data:category,
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
        const category=new Category(req.body)
         await category.save()

         res.status(200).send({
             data:category,
             success:true,
             status:200
         })
    } catch (error) {
        res.status(500).send({
            error:error,
            status:500,
            success:false
        })
    }
})
router.put('/:id',async (req,res)=>{
    try {
        const category=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name,icon:req.body.icon,color:req.body.color},{new:true})
        if(!category){
            res.status(404).send({
                error:{message:"Category not found"},
                status:404,
                success:false
            })
        }else{
            res.status(200).send({
                data:category,
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
      const category= await Category.findByIdAndRemove(req.params.id)
      if(!category){
        res.status(404).send({
            error:{message:"Category not found"},
            status:404,
            success:false
        })
      }else{
          res.status(200).send({
              data:category,
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


module.exports=router




                                     