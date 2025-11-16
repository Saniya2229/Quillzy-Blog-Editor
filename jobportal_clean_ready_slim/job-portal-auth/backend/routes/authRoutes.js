import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";
import "../config/passport.js"; // IMPORTANT: loads Google/GitHub strategies

const router = express.Router();

// -------------------------------
// Normal Auth Routes (Already Working)
// -------------------------------
router.post("/register", registerUser);
router.post("/login", loginUser);

// -------------------------------
// Google OAuth
// -------------------------------
router.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = req.user.token; // token created in passport strategy
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

// -------------------------------
// GitHub OAuth
// -------------------------------
router.get(
  "/oauth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/oauth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default router;
