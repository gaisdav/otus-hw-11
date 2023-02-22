const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/", async (req, res, next) => {
  passport.authenticate("login", {}, async (err, user) => {
    try {
      if (err) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      if (!user) {
        return res.sendStatus(404);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = authRouter;
