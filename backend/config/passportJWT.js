import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import UserService from "../services/user.js";

dotenv.config();

const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  "access-token",
  new JWTStrategy(accessTokenOptions, async (jwtPayload, done) => {
    try {
      const user = await UserService.findUserById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

export default passport;
