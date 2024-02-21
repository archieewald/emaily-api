import express from 'express';
import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';

const GoogleStrategy = GooglePassport.Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_KEY || '',
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT;

app.listen(PORT);

console.log(`App is running at: http://localhost:${PORT}`);
