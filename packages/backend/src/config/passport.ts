import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import dotenv from 'dotenv';
import MyUser from '../models/User';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET'
};

export const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, (jwt_payload: { _id: string }, done: Function) => {
      MyUser.findOne({ _id: jwt_payload._id }, (err: Error, user: any) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
