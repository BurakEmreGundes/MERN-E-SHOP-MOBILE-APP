const mongoose = require('mongoose')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{ type:String, required:true,
    unique:true},
    password:{type:String, required:true},
    phone:{type:String, required:true},
    isAdmin:{type:Boolean, default:false},
    street:{type:String,default:''},
    apartment:{type:String,default:''},
    zip:{type:String,default:''},
    city:{ type:String,default:''},
    country:{type:String,default:''}
    
},{collection:"User",timestamps:true})

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

userSchema.set('toJSON',{virtuals:true})

userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10)
    next()
})


userSchema.statics.userLogin=async (email,password)=>{

    const user=await User.findOne({email:email})
    if(!user){
        throw new Error("Kullanıcı Sisteme Kayıtlı Değil")
    }else{
        const validatePassword=await bcrypt.compare(password,user.password)
        if(!validatePassword){
            throw new Error("Yanlış Şifre Girdiniz")
        }else{
            return user
        }
    }
}

userSchema.methods.generateJWT=async function(){
    
    const token=await jwt.sign({id:this._id,isAdmin:this.isAdmin},"secret-key",{expiresIn:'1d'})
    return token
}




const User=new mongoose.model("User",userSchema)


module.exports=User