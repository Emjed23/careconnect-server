const mongoose=require('mongoose')

const {Schema}=mongoose

const ReviewSchema=new Schema({
       ReviewerName: String, 
       ReviewText:String,
       caregiver:{type:Schema.Types.ObjectId,ref:'Caregiver'}

}
       
)
         
    

module.exports=mongoose.model('Review', ReviewSchema)