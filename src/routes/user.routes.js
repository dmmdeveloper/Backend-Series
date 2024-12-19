import { Router } from "express";
import { logIn, Register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const userRouter = Router();
userRouter.route("/register").post(upload.fields([ { name:"avatar" , maxCount:1} , {name:"coverImage" , maxCount:1}]), Register)
userRouter.route("/login").get(logIn)



export default userRouter