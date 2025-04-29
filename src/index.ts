import express, {Request, Response} from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import myUserRoute from './routes/myUserRoute'
import {v2 as cloudinary} from 'cloudinary'
import myRestaurantRoute from './routes/myRestaurantRoute'
import restaurantRoute from './routes/restaurantRoute'
import orderRoute from './routes/orderRoute'
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to db")
})

cloudinary.config({
     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
     api_key : process.env.CLOUDINARY_API_KEY,
     api_secret : process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/order/checkout/webhook",express.raw({type : '*/*'}))

app.use("/api/my/user",myUserRoute)
app.use("/api/my/restaurant",myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
app.use('/api/order',orderRoute)
app.get('/test' , (req : Request , res : Response)=>{
    res.json({message : "Hello ! "})
})

app.listen(8000,()=>{
    console.log("Server started at port 8000")
})


