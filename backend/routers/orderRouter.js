const router=require("express").Router()
const OrderItem=require("../models/order.item.model")
const Order=require("../models/order.model")
const Product=require("../models/product.model")

router.post("/",async (req,res)=>{
    let orderItems=req.body.orderItems;
    let orderItemIds=[]
    const totalPrice=0;
    try {
       
    orderItems.forEach(async (item) => {
                const orderItem=new OrderItem({
                    quantity:item.quantity,
                    product:item.product,
                })
                orderItemIds.push(orderItem._id);
                 await orderItem.save()         
     });

     orderItems.foreach(async (orderItem)=>{
     const product= await Product.findById(orderItem.product)
     totalPrice+=product.price*orderItem.quantity
     })
  
        const order = new Order({
            orderItems:orderItemIds,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:totalPrice,
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

router.get("/get/count",async (req,res)=>{
    try {
        const orderCount=await Order.countDocuments((count)=>count)
        res.status(200).send({
            status:200,
            success:true,
            orderCount:orderCount
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            success:false,
            error:error
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
router.delete("/:id",async (req,res)=>{
    try {
        const oldOrder=await Order.findByIdAndRemove(req.params.id)
        if(!oldOrder){
            res.status(404).send({
                error:{message:"Order not found"},
                success:false,
                status:404
            })
        }else{
            oldOrder.orderItems.forEach(async (item)=>{
            await OrderItem.findByIdAndRemove(item._id)
            })
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