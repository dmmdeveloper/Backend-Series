import { APIResponse } from "../utils/apiresponse.utils.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";


const Register = asyncHandler ( async (req , res ,_) =>{
console.log(req.url);







res
.status(200)
.json(
    new APIResponse("User Registered Success Fully !!" , {} ,202)
)

})


export { Register}