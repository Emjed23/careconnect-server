const mongoose=require('mongoose')

const {Schema}=mongoose

const AdminSchema=new Schema({
    Email:String,
    Password:String,
    listOfCaregiver:[{type:Schema.Types.ObjectId,ref:'Caregiver'}]
})

module.exports=mongoose.model('Admins',AdminSchema)