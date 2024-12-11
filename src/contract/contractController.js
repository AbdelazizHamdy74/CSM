const contract=require('./contractModel');

const getAllContracts=async(req,res)=>{
    try{
        const contracts=await contract.getAllContracts();
          res.status(200).json({success:true,data:contracts});
    }catch (error) {      
        console.error(error);
        res.status(500).json({success:false, message:"Failed to retrieve contracts",error:error.message});
    }
   
}

module.exports={getAllContracts};