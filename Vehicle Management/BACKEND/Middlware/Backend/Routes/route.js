import {Router} from 'express';
import mongoose from 'mongoose';




const route = Router();

const BookinSchema = new mongoose.Schema({
    roomNo:String,
    checkinDate:String,
    checkinDay:String,
    checkoutDate:String,
    personName:String,
});

const Booking = mongoose.model('BookingDetails',BookinSchema);

mongoose.connect('mongodb://localhost:27017/HotelBooking')

route.post('/hotelBooking', async (req, res) => {
    try {
        const { roomNumber, checkInDate, checkOutDate, bookingPerson } = req.body;

        // Check if a booking already exists for the same room and date range
        const existBooking = await Booking.findOne({
            roomNo: roomNumber
        });

        if (existBooking) {
            res.status(400).json({ message: "Room already booked for the selected dates" });
            console.log("Room already booked for the selected dates");
        } else {
            // Create a new booking
            const newBooking = new Booking({
                roomNo: roomNumber,
                checkinDate:checkInDate,
                checkoutDate:checkOutDate,
                personName: bookingPerson,
            });

            await newBooking.save();
            res.status(201).json({ message: "Booking is successful" });
            console.log("Booking is successful");
        }
    } catch (err) {
        console.error('Error occurred while processing booking:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get all booking
route.get('/getBooking', async (req, res)=>{
    try{
        const BookingDetails = await Booking.find()
        console.log();


        console.log(BookingDetails);
        res.status(200).json(BookingDetails)
    }
    catch(error){
        console.error(error);
        
    }
})

route.get('/getBooking/:checkinDay',async (req,res)=>{
    try{
        const CheckinDay = req.params.checkinDay;
        const BookingDetails = await Booking.find({ checkinDay: CheckinDay });
        res.json({message:"Booking details in a perticular day:",BookingDetails});
        console.log(BookingDetails);
        
    }
    catch(error){
        console.log(error);
        
    }
})

route.get('/getBooking/:date', async (req, res) => {
    try {
        const { date } = req.params; // Get the date from the query parameters
        if (date) {
            // Find bookings that match the date (either check-in or check-out date)
            const bookings = await Booking.find({
                $or: [
                    { checkinDate: date },
                    { checkoutDate: date }
                ]
            });
            res.status(200).json(bookings);
        } else {
            // Return all bookings if no date is specified
            const bookings = await Booking.find({});
            res.status(200).json(bookings);
        }
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Failed to retrieve bookings' });
    }
});


//delete booking
route.delete('/deleteBooking/:bookingId', async(req, res)=>{
    
    const {bookingId} = req.params.bookingId;
    
    const deletebooking = await Booking.findOneAndDelete(bookingId);
    if (deletebooking) {
        res.status(200).json({ message: 'Booking deleted successfully',deletebooking });
    } else {
        res.status(404).json({ message: 'Booking not found' });
    }
})

route.put('/editBooking/:bookingId',async (req, res)=>{
    try{
        const bookingId = req.params.bookingId;

        const {BookingId ,RoomNo, Checkin_Date, CheckinDay, Checkout_Date, PersonName}=req.body;
        const data = await Booking.findOneAndUpdate({bookingId:bookingId},{
            $set:{
                bookingId:BookingId,
                roomNo:RoomNo,
                checkinDate:Checkin_Date,
                checkinDay:CheckinDay,
                checkoutDate:Checkout_Date,
                personName:PersonName
            }
        });
        await data.save();
        if(data.matchedCount == 0){
            return res.status(404).json({message:"booking not found"})
        }else{
           res.status(201).json({ message: "Booking Details Updated" ,data}) 
        }

    }
    catch(error){
        console.error(error);
        
    }
})

export {route}