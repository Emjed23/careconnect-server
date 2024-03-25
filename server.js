

const express=require ('express')
const cors=require('cors')
const mongoose= require('mongoose')
// const connectDB=require('../back-end/Config/connectDB')
require('dotenv').config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('db connected...')
    } catch (error) {
        console.log(error)
    }
}
connectDB()
const app=express()
const port =process.env.port
connectDB()
app.use(express.json())
app.use(cors())
app.use('/CaregiverAPI',require('./Routes/CaregiverRoutes'))
app.use('/AdminAPI',require('./Routes/AdminRoutes'))
app.use('/ReviewAPI',require('./Routes/ReviewRoutes'))
const PORT=8000
app.listen(PORT,(err)=>err?console.log(err):console.log(`app listning on ${PORT}`))

