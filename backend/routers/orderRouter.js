const router=require("express").Router()
const OrderItem=require("../models/order.item.model")
const Order=require("../models/order.model")


router.post("/",async (req,res)=>{
    let orderItems=req.body.orderItems;
    let orderItemIds=[]
    try {
       
    orderItems.forEach(async (item) => {
                const orderItem=new OrderItem({
                    quantity:item.quantity,
                    product:item.product,
                })
                orderItemIds.push(orderItem._id);
                 await orderItem.save()         
     });
  
        const order = new Order({
            orderItems:orderItemIds,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:req.body.totalPrice,
            user:req.body.user,
        })

        await order.save()
        res.status(200).send({
            data:order,
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

router.get("/",async (req,res)=>{
    try {
        const orders=await Order.find({}).sort({"dateOrdered":-1}).populate("user").populate("orderItems").exec()
        if(orders.length<=0){
            res.status(404).send({
                error:{message:"Order not found"},
                success:false,
                status:404
            })
        }else{
            res.status(201).send({
                data:orders,
                success:true,
                status:200
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

router.get("/:id",async (req,res)=>{
    try {
        const order=await Order.findOne({_id:req.params.id})
        .populate("user","name")
        .populate({path:"orderItems",populate:{path:"product",populate:"category"}})
        .exec()
        if(!order){
            res.status(404).send({
                error:{message:"Order not found"},
                success:false,
                status:404
            })
        }else{
            res.status(201).send({
                data:order,
                success:true,
                status:200
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
router.put("/:id",async(req,res)=>{
    try {
        const newOrder=await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})  
        if(!newOrder){
            res.status(404).send({
                error:{message:"Order not found"},
                success:false,
                status:404
            })
        }else{
            res.status(201).send({
                data:newOrder,
                success:true,
                status:200
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
router.delete("/:id",(req,res)=>{
    try {
        const oldOrder=await Order.findByIdAndRemove(req.params.id)
        if(!oldOrder){
            res.status(404).send({
                error:{message:"Order not found"},
                success:false,
                status:404
            })
        }else{
            res.status(201).send({
                data:oldOrder,
                success:true,
                status:200
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