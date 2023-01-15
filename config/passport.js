const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/userSchema");
require('dotenv').config({ path: '../.env' });
const SECRET_KEY = process.env.SECRET_KEY;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
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