const jwt= require('jsonwebtoken');
require('dotenv').config();
 
const genrateToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'30d'});
}

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports={genrateToken,verifyToken};