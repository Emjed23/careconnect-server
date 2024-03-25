const Caregiver =require ('../Modules/CaregiverSchema');
const bcrypt=require('bcrypt')
const saltRounds = 10;
const jwt=require('jsonwebtoken');
const Admin = require('../Modules/AdminSchema');


const CareGiverSignup = async (req, res) => {
    try {
      const Email = req.body.Email;
      const password = req.body.Password;
   console.log(req.body)
      const caregiver = await Caregiver.findOne({ Email });
      if (caregiver) {
        return res.status(400).json({ message: "caregiver already exists" });
      } else {
     
        const hashed= await bcrypt.hash(password,saltRounds)
        const NewCaregiver = new Caregiver({ ...req.body, password: hashed });
        await NewCaregiver.save();
        await Admin.findByIdAndUpdate(req.body.Adminid,{$push:{listOfCaregiver:NewCaregiver}})

        return res
          .status(200)
          .json({ message: "caregiver added successfully", NewCaregiver });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
    const CareGiverlogin=async(req,res)=>{
      try {
        console.log(req.body)
        const Email=req.body.email 
        const password=req.body.password
        const caregiver=await Caregiver.findOne({Email})
        console.log(caregiver)
        if(!caregiver){
          return res.status(200).json({message:"bad credentials"})
        }else {
          const match=bcrypt.compare(password,caregiver.password)
          if(!match){
            return res.status(200).json({message:"bad credentials"})
          }else {
            var token=jwt.sign({id:caregiver._id}, process.env.privetKey)

            return res.json({message:'caregiver logged in',token,caregiver})
          }
        }
    
      } catch (error) {
        return res.status(400).json({ error: error.message });
    
      }
    }

    const getAllCaregiver=async(req,res)=>{
        console.log(req.params)
        try {
            const allCaregiver=await Caregiver.find()/*.populate("review")*/
            return res.json(allCaregiver)
        } catch (error) {
            return res.status(200).json({ error: error.message });
    
        }
    }
    const getOneCaregiver=async(req,res)=>{
        try {
            const caregiver=await Caregiver.findById(req.params.id).populate('Reviews')
            return res.json(caregiver)
        } catch (error) {
            return res.status(200).json({ error: error.message });
    
        }
    }
    const updateCaregiver=async(req,res)=>{
        try {
          console.log(`body`)
          console.log(req.body)
            const  updateCaregiver= await Caregiver.findByIdAndUpdate(req.params.id,{$set:{...req.body}},{new:true})
            return res.json({message:"Caregiver updated",updateCaregiver})
        } catch (error) {
            return res.status(200).json({ error: error.message });
     
        }
    }
    const deleteCaregiver=async(req,res)=>{
        console.log(req.params)
        try {
            await Caregiver.findByIdAndDelete(req.params.id)
        return res.json({message:"Caregiver deleted"})
            
        } catch (error) {
            
        }
    }
module.exports={getAllCaregiver,deleteCaregiver,updateCaregiver,getOneCaregiver,CareGiverSignup,CareGiverlogin}