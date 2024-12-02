import express, { json } from 'express';
import { adminRoute } from './adminRout.js';
import cors from 'cors'


const app=express();
app.use(json());
app.use('/',adminRoute)
app.use(
    cors({ 
      origin: "http://localhost:5173",
      credentials: true
    })
  );

const port=5000;

app.listen(port,()=>{
    console.log(`Server is listening ${port}`);
    
})