import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema( {
    
userName:{
    type:String,
    required:true,
    trim:true,
    lowecase:true ,
    unique : true
},
fullName:{
    type:String, 
    trim:true,
    lowecase :true
},
avatar:{
    type:String ,  // Cloudinary URL
    required:true ,
},
coverIamge :String,
email:{
    type:String ,
    trim:true,
    required:true
},
password:{
    type:String,
    required :true
},
watchHistory :[
    {
        type:String,
    }
],
refreshToken :String 
 },{ timestamps:true})

// Hash The Password before save
 userSchema.pre("save" , async function () {
if(!this.isModified("password")) return; 
    this.password = await bcrypt.hash(this.password , 10)
 })

 userSchema.methods.isPasswordCorrect = async function (password) {
return await bcrypt.compare(password,this.password)
 }


//  Access Token Generate
userSchema.methods.generateAccessToken = function () {
return jwt.sign({
    _id: this._id,
    email: this.email
},
process.env.ACCESS_TOKEN_SECRET ,
{
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
}
)


    
}
// refreshToken 
userSchema.methods.generateRefreshToken = function () {
return jwt.sign(
{
    _id : this._id
    // Payloads
},
// Secret Token ,
process.env.REFRESH_TOKEN_SECRET,
{
// Options
expiresIn  : process.env.REFRESH_TOKEN_EXPIRY

}

)


    
}





 
 export const User = mongoose.model("User", userSchema)