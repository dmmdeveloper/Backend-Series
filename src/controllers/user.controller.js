import { User } from "../models/user.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIResponse } from "../utils/apiresponse.utils.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";
import { unlinkSync } from 'node:fs';
import z from "zod";
import { uploadOnCloudinary } from "../utils/uploadcloadinary.utils.js";
import { sendEmail } from "../utils/sendemail.utils.js";

const userSchema  = z.object({
    userName: z.string().min( 3 , { message:"userName at least 3 charaters"}),
    email: z.string().email({message:"Invalid Email Address"}), 
    password:z.string().min(6 , { message:"Password At least 6 letters"})
})





const Register = asyncHandler ( async (req , res ,_) =>{
console.log(req.url);

// get Data 
// get files
// Validation for required Fileds
// validation of zod
// check for User Creation
// upload files on cloudinary
// create user Object
// remove unnesseary fileds
// sendEmail
// return res

const {userName,fullName,email,password} = req.body ; 
console.log(userName, fullName ,email,password,);

let avatar;
let coverImage 

if(req.files.avatar){
    avatar  = req.files.avatar[0].path
}else{
    throw new APIError("Avatar is required :) " , 403)
}
if(req.files.coverImage){
    coverImage = req.files?.coverImage[0]?.path
}
console.log(avatar ,coverImage );
const requiredFields = [ "userName" , "email","password"]
for(let filed of requiredFields){


    if(!req.body[filed]){
unlinkSync(avatar)
if(coverImage){
    unlinkSync(coverImage)
}

        throw new APIError(`${filed} is Required`,403)
    }
}
const zodValidation   = userSchema.safeParse({userName,email,password})
const zodValidationmessages  = zodValidation.error?.errors.map((z)=> z.message+"\n" ) || null
console.log("zod Validation : " , zodValidationmessages);
if(zodValidationmessages){
    throw new APIError(zodValidationmessages , 203)
}

const findUser = await User.findOne({
    $and : [ {userName},  { email}]
})

if(findUser){
    unlinkSync(avatar)
    if(coverImage)unlinkSync(coverImage)
    throw new APIError("User Already Exists \n Try Another User" , 403)
}
const avatarURL  = await uploadOnCloudinary(avatar)
const coverIamgeURL  = await uploadOnCloudinary(coverImage)
console.log("AvatarURL ", avatarURL , coverIamgeURL);


const createdUser = await User.create({
    userName,
    fullName,
    email,
    password,
    avatar:avatarURL ,
    coverImage:avatarURL ||""

})
// console.log(createdUser);
const RegisteredUser = await User.findById(createdUser._id).select("-password  -refreshToken")
if(RegisteredUser){
    sendEmail(email,"testing For Bacend_Continue_Series","",`<h1>Hello Dear User (:-)</h1>` )
}else{
    throw new APIError("Error When User Registered :)" , 504)
}
res
.status(200)
.json(
    new APIResponse("User Registered Success Fully !!" , RegisteredUser ,202)
)

})


const logIn = asyncHandler (async (req,res,next) =>{

    res.status(200)
    .json(
        new APIResponse("User LoggedIn", {} , 203)
    )
})

export { Register , logIn}