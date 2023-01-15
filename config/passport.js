const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const { Strategy } = passportJWT;

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../models/userSchema");

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });

      return user ? done(null, user) : done(new Error("User not found"));
    } catch (err) {
      done(err);
    }
  })
);