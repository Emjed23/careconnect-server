const express=require('express')
const {addNewAdmins,login, updateAdmins, deleteAdmins, getAdmin} = require('../Controllers/AdminController')
const AdminMiddlewares = require('../Midellwares/AdminMidellwares')

const Router=express.Router()

Router.post('/newAdmins',addNewAdmins)
Router.post('/login',login)
Router.delete('/delete/:id',deleteAdmins)
Router.put('/updateAdmins/:id',AdminMiddlewares,updateAdmins)
Router.get('/getAdmin/:id',getAdmin)

module.exports=Router