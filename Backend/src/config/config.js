import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("Please provide MONGO_URI in the environment variables");
}
if (!process.env.JWT_SECRET) {
    throw new Error("Please provide JWT_SECRET in the environment variables");
}
if (!process.env.JWT_EXPIRE) {
    throw new Error("Please provide JWT_EXPIRE in the environment variables");
}


export const config = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    frontendURL: process.env.FRONTEND_URL || "http://localhost:5173",
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    nodeEnv: process.env.NODE_ENV || "development"
}