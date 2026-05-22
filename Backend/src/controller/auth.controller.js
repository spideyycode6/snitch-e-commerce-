import userModel from "../model/user.model.js";
import { generateToken, verifyToken } from "../utils/jwt.utils.js";
import { config } from "../config/config.js";

export const registerUser = async (req, res) => {

    const { firstName, lastName, email, password, contact,role } = req.body;

    try {
        const existingUser = await userModel.findOne({ $or: [{ email }, { contact }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = await userModel.create({ firstName, lastName, email, password, contact, role });
        
        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true, message: "User registered successfully", user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                contact: user.contact,
                role: user.role,
                createdAt: user.createdAt
            }
        });




    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(401).json({success:false,message:"Invalid credentials"});
        }

        const isMatch = await user.matchPassword(password);
        
        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid credentials"});
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                contact: user.contact,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



export const googleCallback = async (req, res) => {
    try{
        const token = generateToken(req.user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${config.frontendURL}/auth/success`);
    }
    catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}
