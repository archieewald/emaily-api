import passport from 'passport';
import mongoose from 'mongoose';
import GooglePassport from 'passport-google-oauth20';
import { userSchema } from '../models/User';

const GoogleStrategy = GooglePassport.Strategy;
const User = mongoose.model('users', userSchema);

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id).then((user) => done(null, user));
});

const handleUserAuthentication = async (
  { id, displayName, emails }: GooglePassport.Profile,
  done: GooglePassport.VerifyCallback
) => {
  try {
    const user = await User.findOne({ googleId: id });

    if (user) {
      return done(null, user);
    }

    const createdUser = await new User({ googleId: id, name: displayName, email: emails?.[0].value }).save();
    done(null, createdUser);
  } catch (error) {
    done(error as Error);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_KEY || '',
      callbackURL: process.env.CALLBACK_URL
    },
    (_accessToken, _refreshToken, profile, done) => handleUserAuthentication(profile, done)
  )
);
