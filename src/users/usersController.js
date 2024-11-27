const user= require('./usersModel');
const {userSchema} = require('./userValidator');
const bcrypt = require('bcryptjs');

const getAllUsers=async(req,res)=>{
    try {
    const users= await user.getALLUsers();
     res.status(200).json({success:true,data:users});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Failed to retrieve users",error:error.message});
    }
};

const getUserById=async(req,res)=>{
    try {
    const {id}=req.params;
    const guser= await user.getUserById(id);
    if(guser){
        res.status(200).json({success:true,data:guser});
    }else{
        res.status(404).json({success:false, message:"User not found"});
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Failed to retrieve user",error:error.message});
    }
};

const getUserByEmail=async(req,res)=>{
    try {
    const {email}=req.params;
    const guser= await user.getUserByEmail(email);
    if(guser){
        res.status(200).json({success:true,data:guser});
    }else{
        res.status(404).json({success:false, message:"User not found"});
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Failed to retrieve user",error:error.message});
    }
};

const updateUser=async(req,res)=>{
    try {
    const {id}=req.params;
    const {error,value}=userSchema.validate(req.body);
    if(error){
        return res.status(400).json({success:false, message:"Validation failed",error:error.details[0].message});
    }
    const hashedPassword = await bcrypt.hash(value.password, 12);
            const nUser = {
                ...value,
                password: hashedPassword ,
            };
    const updated= await user.updataUser(id,nUser);
    if(updated){
        res.status(200).json({ success: true, message: 'User updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Failed to update user",error:error.message});
    }
};


const deleteUser=async(req,res)=>{
    try {
    const {id}=req.params;
    const deleted= await user.deleteUser(id);
    console.log(deleted)
    if(deleted){
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Failed to delete user",error:error.message});
    }
};

module.exports={getAllUsers,getUserById,getUserByEmail,updateUser,deleteUser};
