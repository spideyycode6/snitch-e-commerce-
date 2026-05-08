// utils/passport.utils.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../config/config.js";
import userModel from "../model/user.model.js";

passport.use(new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            let user = await userModel.findOne({ googleId: profile.id });

            if (user) {
                // ✅ Existing user — just login
                return done(null, user);
            }

            // 🆕 New user — create account
            user = await userModel.create({
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            });

            return done(null, user);

        } catch (error) {
            return done(error, null);
        }
    }
));

export default passport;