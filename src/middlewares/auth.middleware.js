import jwt from "jsonwebtoken";
import { APIError } from "../utils/apierror.utils.js";
import { User } from "../models/user.model.js";



export const verifyJWT  = async (req,_,next) => {
    try {

const token  = req.cookies?.accessToken || req.header("Authorization").replace("Bearer","");

if(!token){
    throw new APIError("UnAuthorized Token :)" , 404)
}

const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
const findUser   = await User.findById(decodedToken._id).select("-password -refreshToken")

req.user  = findUser
    next(); 


        
    } catch (error) {
        throw new APIError("UnAutorized Request :))" ,403)
        
    }
    
}