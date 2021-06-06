const User = require("../models/user.model")

const router=require("express").Router()


router.get("/",async (req,res)=>{
    try {
        const users=await User.find({}).select("-password")
        if(users.length<=0){
            res.status(404).send({
                success:false,
                error:{message:"User not found!"},
                status:404
            })
        }else{
            res.status(200).send({
                data:users,
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
            const user=await User.findOne({_id:req.params.id}).select("-password")
            if(!user){
                res.status(404).send({
                    success:false,
                    error:{message:"User not found!"},
                    status:404
                })
            }else{
                res.status(200).send({
                    data:user,
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


router.post('/register',async (req,res)=>{
    try {
     
        const user=new User(req.body)
        await user.save()
        res.status(201).send({
            data:user,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error:error,
    })
    }
})

router.post("/login",async (req,res)=>{
    try {
        const user=await User.userLogin(req.body.email,req.body.password)
        const token=await user.generateJWT()
        res.status(200).send({
            data:{user,token},
            success:true,
            status:200
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            error:{message:error.message},
    })
    }
})
router.get('/get/count',async (req,res)=>{
    const userCount=await User.countDocuments((count)=>count)
    
    if(!userCount){
        res.status(500).send({
            error:{message:"User Count not found"},
        })
    }
    res.status(200).send({
        userCount:userCount,
        status:200,
        success:true
    })


})




module.exports=router;