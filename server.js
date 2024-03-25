

const express=require ('express')
const cors=require('cors')
const connectDB=require('../back-end/Config/connectDB')
const app=express()
require('dotenv').config()
const port =process.env.port
connectDB()
app.use(express.json())
app.use(cors())
app.use('/CaregiverAPI',require('./Routes/CaregiverRoutes'))
app.use('/AdminAPI',require('./Routes/AdminRoutes'))
app.use('/ReviewAPI',require('./Routes/ReviewRoutes'))
const PORT=8000
app.listen(PORT,(err)=>err?console.log(err):console.log(`app listning on ${PORT}`))

