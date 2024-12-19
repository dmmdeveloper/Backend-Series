import nodemailer from "nodemailer"

 export const sendEmail  = (to,subject , text, html) =>{




const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
    user:process.env.COMPANY_EMAIL,
    pass:process.env.EMAIL_PASSWORD 
}
} )

const mailOptions = {
    from: process.env.COMPANY_EMAIL,
    to,
    subject,
    text,
    html
}
transporter.sendMail( mailOptions ,  (error , response)=>{
console.log(`Email Sent To ${response.response}`);
})  

}