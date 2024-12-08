const {verifyToken}=require('../jwtUtils')

const authenticate=(req,res,next)=>{

    const token = req.cookies.token;
    // const token =req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Login required' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token', error });
    }

};
module.exports = { authenticate };