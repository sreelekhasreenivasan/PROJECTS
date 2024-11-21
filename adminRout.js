import { Router } from "express";
import mongoose from "mongoose";



mongoose.connect('mongodb://localhost:27017/VMS')
const adminRoute=Router();



const vehicleSchema = new mongoose.Schema(
    {
        vehicleNumber: { type: String, unique: true },
        vehicleType: String,
        serviceNumber:String,
        servicegivenDate: String,
        estmtdTime: String,
        vehicleOwner:String,
        serviceDetails:String,


    }
)
const vehicle = mongoose.model('Vehicle_Details', vehicleSchema)


adminRoute.post('/addvehicle', async (req,res)=>{


    try{

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
        res.status(200).json({message:'Vehicle added successfully'})  

    }else{
       
        // console.log('Already exist');
        res.status(201).json({message:'Already registered'})
    }

}
catch(error){
    console.log('Server error',error);
    
}
   


})



adminRoute.get('/viewdetails/:id',async (req,res)=>{

    const id=req.params.id

    if(id){

       const details= await vehicle.findOne()
        console.log('details fetched',details);
        res.status(200).json({message:'data fetched',details})
        
    }
    

})




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



adminRoute.delete('/delete/:id',async (req,res)=>{

    const id=req.params.id;
    console.log(id);
    

    if(id){

        await vehicle.deleteOne()

        console.log('data deleted');
        res.status(200).json({message:'deleted successfully'})
    }
    
    

})

export {adminRoute}