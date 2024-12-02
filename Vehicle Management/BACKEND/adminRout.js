import { Router } from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { authenticate } from "./Middlware/auth.js";



mongoose.connect('mongodb://localhost:27017/VMS')
const adminRoute=Router();

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    userRole: String
})
const User = mongoose.model('UserDetails', userSchema);

const vehicleSchema = new mongoose.Schema(
    {
        vehicleNumber: { type: String, unique: true },
        vehicleType: { type: String, required: true, enum: ['car', 'bike', 'lorry'] },
        serviceNumber:String,
        servicegivenDate: String,
        estmtdTime: String,
        vehicleOwner:String,
        serviceDetails:String,


    }
)
const vehicle = mongoose.model('Vehicle_Details', vehicleSchema)

adminRoute.post('/signup', async (req, res) => {
    try {
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = req.body;
        const newP = await bcrypt.hash(Password, 10);
       
        const existingUser= await User.findOne({userName:UserName})
        if (existingUser) {
            console.log("User already exsit!")
            res.status(403).json({ message: "User already exist!" });
        }
        else {
            const newUser = new User({
                firstName:FirstName,
                lastName:LastName,
                userName:UserName,
                password: newP,
                userRole:Role
            });
            await newUser.save();
            console.log("User successfully registered!")
            res.status(201).json(newUser);
            console.log(newUser);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})

adminRoute.post('/login', async (req,res)=>{
   
     const {
         UserName,
         Password
     }=req.body
 
     const result = await User.findOne({userName:UserName})
     console.log(result);
     if(!result){
         res.status(403).json({message:"user not exist"})
     }
     else{
    
         const invalid = await bcrypt.compare(Password, result.password);
         console.log(invalid);
         if(!invalid){
             res.status(403).json({message:"Password is incorect"})
         }
         else{
             const token= jwt.sign({UserName:UserName,UserRole:result.userRole},secretKey,{expiresIn:"1h"})
             res.cookie('AuthToken',token,{
                 httpOnly:true
             });
             console.log(token);
             res.status(200).json({message:"Loggedin successfully"});
             console.log("Login successfull");
             
             
         }
     }
 })

 
adminRoute.post('/addvehicle', async (req,res)=>{


    try{

    const newVehicle=req.body;

    const {
        Servicenumber,
        Vehiclenumber,
        Vehicletype,
        Servicegivendate,
        Estmtdtime,
        Vehicleowner,
        Servicedetails

    }= newVehicle;


    const existing= await vehicle.findOne({vehicleNumber:Vehiclenumber})

    if(!existing){

        const newVehicle = new vehicle({
            vehicleNumber: Vehiclenumber,
            vehicleType:Vehicletype,
            serviceNumber:Servicenumber,
            servicegivenDate:Servicegivendate,
            estmtdTime: Estmtdtime,
            vehicleOwner:Vehicleowner,
            serviceDetails:Servicedetails
        });
        await newVehicle.save();
        console.log('Vehicle added for service');  
        res.json(newVehicle)  

    }else{
       
        // console.log('Already exist');
        res.status(201).json({message:'Already registered'})
    }

}
catch(error){
    console.log('Server error',error);
    
}
   


})



adminRoute.get('/viewdetails',async (req,res)=>{


    try {
        const vehicles = await vehicle.find();
        res.json(vehicles);
        console.log(vehicles);
        
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

})

adminRoute.get('/viewone/:id', async (req, res) => {

    const Vehicletype=req.params.id;

    try {
      const vehicles = await vehicle.find({ vehicleType: Vehicletype});

      res.json(vehicles);
      console.log(vehicles);
      

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


adminRoute.put('/update', async (req,res)=>{

   
    const body=req.body;

    const {
        Servicenumber,
        Vehiclenumber,
        Vehicletype,
        Servicegivendate,
        Estmtdtime,
        Vehicleowner,
        Servicedetails

    }= body;

    const data=await vehicle.updateOne({vehicleNumber:Vehiclenumber},
        {
            $set:{
                vehicleNumber: Vehiclenumber,
            vehicleType:Vehicletype,
            serviceNumber:Servicenumber,
            servicegivenDate:Servicegivendate,
            estmtdTime: Estmtdtime,
            vehicleOwner:Vehicleowner,
            serviceDetails:Servicedetails
            }
        }
    )
    if(data.matchedCount===0){
        res.send('No details found')
    }else{
        res.status(200).json({message:'details updated'})
    }

})



adminRoute.delete('/delete/:id', async (req, res) => {
    const Vehiclenumber=req.params.id;

    
    try {
      const existing = await vehicle.findOne({ vehicleNumber: Vehiclenumber });

      if (existing) {

          await vehicle.deleteOne({ vehicleNumber: Vehiclenumber })
          res.status(200).json({ message: "Data Deleted" });
          console.log("Data Deleted");
      }
      else {

          res.status(404).json({ message: "No Book Found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export {adminRoute}