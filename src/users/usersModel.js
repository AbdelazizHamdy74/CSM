const knex=require("../../db");

const getALLUsers=()=>{
    return knex('users').select('*').where({isDeleted:false});
}
const getUserById=(id)=>{
   return knex('users').select('*').where({id,isDeleted:false}).first();
}
const getUserByEmail=(email)=>{
    return knex('users').select('*').where({email,isDeleted:false}).first();
 }
const createUser= async(user)=>{
  const extisted= await knex('users').where({email:user.email,isDeleted: true}).first();
  if(extisted){
    return await knex('users').where({email:user.email}).update({...user,isDeleted:false});
  }else{
    return await knex('users').insert(user);
  }

   
}
const updataUser= async(id,user)=>{
  return await knex('users').where({id}).update(user);
}
const deleteUser= async(id)=>{
  return await knex('users').where({id}).update({isDeleted:true});
}
module.exports={getALLUsers,getUserById,getUserByEmail,createUser,updataUser,deleteUser};