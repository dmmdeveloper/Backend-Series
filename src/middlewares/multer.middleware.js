import multer from "multer"
// Multer Confinguration

const storage  = multer.diskStorage ( {
    destination:function (req,_,cb) {
        cb(null , "public/temp")
    } ,
    filename: function (req,file,cb) {
        cb(null , `${Math.floor(Math.random()*999)}_${file.originalname}`);
    }
 }) ;
 export const upload  = multer({storage}) ; 

