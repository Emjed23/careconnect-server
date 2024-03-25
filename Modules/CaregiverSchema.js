const mongoose=require('mongoose')

const {Schema}=mongoose

const CaregiverSchema=new Schema({
    Name:String,
    Surname:String,
    Email:String,
    PhoneNumber:Number,
    Address:String,
    Age:Number,
    Gender:String,
    Picture:String,
    password:String,
    Experience:String,
    Reviews:[{type:Schema.Types.ObjectId,ref:'Review'}]

})

module.exports=mongoose.model('Caregiver', CaregiverSchema)