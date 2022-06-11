const passport = require("passport");
const passportJWT = require("passport-jwt");
const { User } = require("../models/user");
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const opts = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  })
);
