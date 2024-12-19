import { Router } from "express";
import { Register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const userRouter = Router();
userRouter.route("/register").post(upload.fields([ { name:"avatar" , maxCount:1} , {name:"coverImage" , maxCount:1}]), Register)



export default userRouter