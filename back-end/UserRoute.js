import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "./auth.js";
import dotenv from 'dotenv';

dotenv.config();
const UserRoute = Router();
const user = new Map();
const Certificate = new Map();
const secretKey = process.env.Secretkey;



//signup
UserRoute.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const { FirstName, LastName, UserName, Password, UserRole } = data;
        const newP = await bcrypt.hash(Password, 10);
        if (user.has(UserName)) {
            console.log("User already registered!")
            res.status(200).json({ message: "User already registered!" });
        } else {
            user.set(UserName, { FirstName, LastName, Password: newP, UserRole })
            console.log(`${UserName} registered successfully`)
            res.status(201).json({ message: "Registered successfully" })
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})




//login
UserRoute.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        const Data = user.get(UserName);
        if (!Data) {
            console.log("User already registered")
            res.status(200).json({ message: "User already registered"})
        } else {
            const checked = await bcrypt.compare(Password, Data.Password)
            if (checked) {
                const token = jwt.sign({ UserName: UserName, UserRole: Data.UserRole }, secretKey, { expiresIn: '1h' })
                res.cookie('authToken', token, {
                    httpOnly: true
                });

            }
            console.log(`${UserName} logged in successfully`)
            console.log(user)
            res.status(201).json({ message: "User loggedin successfully" })
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})

//User role
UserRoute.get('/viewUser', authenticate, (req, res) => {

    try {
        const user = req.UserRole;
        // console.log(user);
        res.json({user})
    }
    catch {
        res.status(404).json({ message: 'user not authorized' });
    }
})

//issuecertificate
UserRoute.post('/issuecertificate', authenticate, (req, res) => {
    const role = req.UserRole;
    try {
        const {
            CourseId,
            CourseName,
            CandidateName,
            Grade,
            IssueDate
        } = req.body;


        if (role == "Admin") {
            if (Certificate.has(CourseId)) {
                console.log("Already Issued")
                res.status(200).json({ message: "Already issued!" });
            }
            else {
                Certificate.set(CourseId, { CourseName, CandidateName, Grade, IssueDate });
                console.log(Certificate);
                console.log('Certificate Issued')
                res.status(201).json({ message: "New Certificate!",Certificate})
            }
        } else {
            console.log("You are not Admin")
            res.status(202).json({ message: "You are not admin" })
        }

    }
    catch (error) {
        res.status(500).json(error);
    }
})


UserRoute.get('/viewCertificate', async(req,res)=>{
    try{
        if(Certificate.length == 0){

            res.status(404).json({message:'Not Found'});
            
        }
        else{
            const data  = await Certificate.get();
            res.send(data)
            res.status(201).json({data});
        }
    }
    catch(err){
        console.log(err);
    }
})


UserRoute.get('/search/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const certificateData = await Certificate.get(id)

        if (certificateData) {

            res.status(200).json({ message: "Certificate find",data: certificateData });
        } else {
            res.status(404).json({ message: "the id not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
})

UserRoute.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: "User Successfully logout" });
})


export { UserRoute }