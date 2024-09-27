import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userModel } from '../models/user-model.js';
import dotenv from 'dotenv';
dotenv.config(); 

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,           
};

export default function(passport) {
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
