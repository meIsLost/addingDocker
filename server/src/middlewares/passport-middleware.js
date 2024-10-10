import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../models/user-model.js";
import { env } from "../common/env.js";
import dotenv from "dotenv"; // env doesn't work here
import { connect } from "../databases/connection.js";
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
        await connect();
        const user = await userModel.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }),
  );
}
