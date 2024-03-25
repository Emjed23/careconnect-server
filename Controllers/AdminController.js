const Admins =require("../Modules/AdminSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt=require('jsonwebtoken')


const addNewAdmins =async(req, res) => {
  try {
    const Email = req.body.Email;
    const Password = req.body.Password;
 
    console.log(Password)
    const Admin= await Admins.findOne({Email});
    if (Admin) {
      return res.status(400).json({ message: "Admin already exists" });
    } else {
   
      const hashed= await bcrypt.hash(Password,saltRounds)
      console.log(hashed)
      const newAdmin= Admins({...req.body,password:hashed});
      await newAdmin.save();
      return res
        .status(200)
        .json({message:"Admins added successfully",newAdmin});
    }
  } catch (error) {
    return res.status(400).json({error:error.message });
  }
}
  const login=async(req,res)=>{
    try {
      console.log(req.body)
      const Email=req.body.Email
      const Password=req.body.Password
      const Admin=await Admins.findOne({Email}).populate('listOfCaregiver')
      console.log(Admin)
      if(!Admin){
        return res.status(200).json({message:"bad credentials"})
      }else {
        const match=bcrypt.compare(Password,Admin.Password)
        if(!match){
          return res.status(200).json({message:"bad credentials"})
        }else {
          var token=jwt.sign({id:Admin._id}, process.env.privetKey)
          return res.json({message:'Admins logged in',token,Admin})
        }
      }
  
    } catch (error) {
      return res.status(400).json({ error: error.message });
  
    }
  }
  const getAdmin=async(req,res)=>{
    try {
      const Admin=await Admins.findById(req.params.id).populate('listOfCaregiver').select("-Password")
      return res.json(Admin)
    } catch (error) {
      return res.status(400).json({ error:error.message });
  
    }
  }
  const deleteAdmins=async(req,res)=>{
    try {
      await Admins.findByIdAndDelete(req.params.id)
      return res.json({message:"Admins deleted"})
    } catch (error) {
      return res.status(400).json({ error: error.message });
  
    }
  }
  const updateAdmins=async(req,res)=>{
    try {
      const updatedAdmins= await users.findByIdAndUpdate(req.params.id,{$set:{...req.body}},{new:true})
      return res.json({message:"Admin updated successfully",updatedAdmins})
      
    } catch (error) {
      return res.status(400).json({ error: error.message });
  
    }
  }
module.exports={addNewAdmins,login,getAdmin,deleteAdmins,updateAdmins}
