import { Router } from "express";
import { loginUser, registerUser, googleCallback } from "../controller/auth.controller.js";
import { validateLoginUser, validateRegisterUser } from "../validator/auth.validator.js";
import passport from "../utils/passport.utils.js";
import {config} from "../config/config.js";


const router = Router();

// 1️⃣ Start Google Login — redirects to Google
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"] // 👈 what we need from Google
  })
);

// 2️⃣ Google Callback — Google redirects here after login
router.get("/google/callback",
  passport.authenticate("google", {
    session: false,       // 👈 we use JWT not sessions
    failureRedirect: config.nodeEnv === "development" ? `${config.frontendURL}/login`  : "/login"  // 👈 where to go if login fails
  }), googleCallback
);

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', validateRegisterUser, registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 */

router.post('/login', validateLoginUser, loginUser);

export default router;
