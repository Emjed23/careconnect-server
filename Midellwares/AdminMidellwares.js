const Jwt  = require("jsonwebtoken")
const users = require('../Modules/AdminSchema')


const AdminMiddleware=async(req,res,next)=>{
    try {
        
        const token=req.headers.auth
        if(!token){
        return  res.json({message:'not authorized'})
        }else {
            var decoded=Jwt.verify(token ,process.env.privetKey)
            const Admin = await Admin.findById(decoded.id)
            if(!Admin){
                return res.json({message:'not authorized'})

            }else 
            next()
        }
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}
module.exports=AdminMiddleware