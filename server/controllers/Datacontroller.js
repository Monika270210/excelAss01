
import Datamodel from "../models/Datamodel.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();



const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASSWORD,
    },
   tls:{
       rejectUnauthorized:false,
   }
});



export const postData=async(req,res)=>{
       const newData=req.body;
       console.log(newData);
       const day=parseInt(newData.day);
       console.log(day);
       const mailOptions={
        from:process.env.EMAIL,
        to:newData.email,
        subject:'Verification mail',
        text:'Hello! Nice to hear you back',
    }
       if(day%2===0)
       {
           console.log("this dob is even");
           transporter.sendMail(mailOptions,(err,success)=>{
               if(err){
                   console.log(err);
               }
               else{
                   console.log("mail has been sent successfully");
               }
           })
       }
       const addedData=await new Datamodel(newData);
      try {
          console.log("before");
          await addedData.save();
          console.log("successfully saved");
          res.send({message:"Added successfully"});
      } catch (error) {
          console.log("error occured ",error);
      }
}
