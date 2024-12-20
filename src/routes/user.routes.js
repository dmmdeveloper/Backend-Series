import { Router } from "express";
import { logIn, logOut, Register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const userRouter = Router();
userRouter.route("/register").post(upload.fields([ { name:"avatar" , maxCount:1} , {name:"coverImage" , maxCount:1}]), Register)
userRouter.route("/login").post(upload.none() , logIn)

// Secure Routes
userRouter.route("/logout").post(verifyJWT, logOut)


export default userRouter