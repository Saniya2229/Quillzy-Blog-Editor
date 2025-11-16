import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ------------------------------
// GOOGLE STRATEGY
// ------------------------------
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/oauth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile?.emails?.[0]?.value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            password: "oauth-login", // dummy password
            role: "Job Seeker",
          });
        }

        // attach token for callback route
        user.token = generateToken(user._id);

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ------------------------------
// GITHUB STRATEGY
// ------------------------------
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/oauth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email =
          profile?.emails?.[0]?.value || `${profile.id}@github-noemail.com`;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            password: "oauth-login",
            role: "Job Seeker",
          });
        }

        user.token = generateToken(user._id);

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
