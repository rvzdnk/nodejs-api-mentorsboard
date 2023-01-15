const passport = require('passport');
const User = require("../models/userSchema");

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config();

const params = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JWTStrategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });

      return user ? done(null, user) : done(new Error("User not found"));
    } catch (err) {
      done(err);
    }
  })
);