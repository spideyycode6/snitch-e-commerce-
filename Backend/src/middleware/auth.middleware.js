import { verifyToken } from "../utils/jwt.utils.js";

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        const decoded = verifyToken(token);
        console.log("Decoded",decoded)
        if(!decoded){
            return res.status(401).json({success:false,message:"invalid token"});
        }
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({success:false,message:"user not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({success:false,message:"Unauthorized"});
    }
}

export {authMiddleware};
