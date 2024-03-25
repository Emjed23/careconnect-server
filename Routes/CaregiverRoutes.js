const express=require('express')
const {getAllCaregiver,deleteCaregiver,updateCaregiver,getOneCaregiver, CareGiverlogin, CareGiverSignup}= require('../Controllers/CaregiverController')
const UserMiddleware = require('../Midellwares/userMiddleWare')

const Router=express.Router()
Router.post('/CareGiverSignup',CareGiverSignup)
Router.post('/CareGiverlogin',CareGiverlogin)
Router.get('/getAllCaregiver',getAllCaregiver)
Router.get('/getOneCaregiver/:id',getOneCaregiver)
Router.put('/updateCaregiver/:id',UserMiddleware,updateCaregiver)
Router.delete('/deleteCaregiver/:id',deleteCaregiver)

module.exports=Router