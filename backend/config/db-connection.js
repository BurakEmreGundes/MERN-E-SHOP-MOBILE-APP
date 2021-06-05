const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost/E-SHOP",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(_=>{ console.log("Veri tabanına bağlanıldı!") })
.catch(err=>{ console.log(err)})