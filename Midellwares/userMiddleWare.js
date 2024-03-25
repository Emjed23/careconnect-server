const Jwt  = require("jsonwebtoken")
const Caregiver = require('../Modules/CaregiverSchema')
const Admin = require("../Modules/AdminSchema")


const UserMiddleware=async(req,res,next)=>{
    try {
        
        const token=req.headers.auth
        if(!token){
        return  res.json({message:'not authorized'})
        }else {
            var decoded=Jwt.verify(token ,process.env.privetKey)
            console.log(decoded.id)
            const caregiver = await Caregiver.findById(decoded.id)
            const admin = await Admin.findById(decoded.id)

            if( !caregiver && !admin){
                return res.json({message:'not authorized'})

            }else 
            next()
        }
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}
module.exports=UserMiddleware