import express, { json } from 'express';
import { UserRoute } from './UserRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app=express();

const port=process.env.port;

app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
    // origin:'http://127.0.0.1:8000'
}))
app.use(json())
app.use(cookieParser());
app.use('/',UserRoute)

app.get('/',(req,res)=>{
    res.send('Server is listening')
})

app.listen(port,()=>{
    console.log('Server is listening')
})

