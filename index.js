import express, { json } from 'express';
import { adminRoute } from './adminRout.js';



const app=express();
app.use(json());
app.use('/',adminRoute)

const port=5000;

app.listen(port,()=>{
    console.log(`Server is listening ${port}`);
    
})