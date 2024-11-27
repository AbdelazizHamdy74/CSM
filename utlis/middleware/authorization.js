const {verifyToken}=require('../jwtUtils')
 
const authorize=(allowedRoles)=>(req,res,next)=>{
   try{
        // const token = req.cookies.token;
        const token =req.headers.authorization?.split(' ')[1]
            if (!token) {
             return res.status(401).json({ message: 'Login required' });
            }
            const decoded = verifyToken(token);
            if(!allowedRoles.includes(decoded.role)){
                return res.status(403).json({ message: 'Access denied' });
            }
        req.user=decoded;
        next()
   }
   catch(error){
    res.status(403).json({ message: 'Invalid or expired token', error });
   }
   
};
 module.exports = {authorize};