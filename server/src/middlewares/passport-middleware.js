import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userModel } from '../models/user-model.js';
import { env } from "../common/env.js";
import dotenv from "dotenv"; // env doesn't work here 
dotenv.config();

const ACCESS_TOKEN_SECRET = env("ACCESS_TOKEN_SECRET");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,           
};

export default function initializePassport(passport) {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await userModel.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false); 
      }
    })
  );
}
